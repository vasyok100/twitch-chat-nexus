import { assignPropertyIfValid } from "src/util/assignPropertyIfValid";
import { isRecord } from "src/util/typePredicates";
import { getGqlClient } from "../../clients/GqlClient";
import messaging from "../../messaging";

export const forceModPermission = () => {
    const gqlClient = getGqlClient();
    
    let isBroadcaster = false;
    let isModerator = false;

    const hasRealModPermission = () => isBroadcaster || isModerator;

    const isViewerCardPage = () => location.pathname.includes('/viewercard/');

    const messageType = 'IS_MODERATOR';

    const postMessage = () => {
        messaging.postMessage({ type: messageType, content: hasRealModPermission() })
    };

    messaging.on('message', (message) => {
        if (message.type === messageType) {
            postMessage();
        }
    });

    gqlClient.setResponseHook('ViewerCard', async(request, response) => {
        isBroadcaster = response?.data?.channelUser?.id === response?.data?.currentUser?.id;
        postMessage();

        if (!assignPropertyIfValid(response?.data?.channelUser?.self, 'isModerator', true)) {
            console.log('could not modify ViewerCard response.');
        }
        return response;
    });

    gqlClient.setResponseHook('ViewerCardModLogsPermissions', async(request, response) => {
        if (
            !assignPropertyIfValid(response?.data?.channel?.moderationSettings, 'canAccessViewerCardModLogs', true) ||
            !assignPropertyIfValid(response?.data?.channelUser?.self, 'isModerator', true)
        ) {
            console.log('could not modify ViewerCardModLogsPermissions response.');
        }
        return response;
    });

    // Twitch moved the mod-logs gate into its own query. Without this the panel
    // shows "Access denied" even though the server still returns the messages.
    gqlClient.setResponseHook('ModLogsAccessQuery', async(request, response) => {
        if (!assignPropertyIfValid(response?.data?.channel?.moderationSettings, 'canAccessViewerCardModLogs', true)) {
            console.log('could not modify ModLogsAccessQuery response.');
        }
        return response;
    });

    // For non-moderators the moderation-action fields come back as
    // ModLogsTargetedActionsError/UNAUTHORIZED, which breaks rendering of the whole
    // panel. Only the message list is needed here, so blank the rest out.
    gqlClient.setResponseHook('ViewerCardModLogs', async(request, response) => {
        const modLogs = response?.data?.viewerCardModLogs;
        if (isRecord(modLogs)) {
            Object.entries(modLogs).forEach(([key, value]) => {
                if (isRecord(value) && value.__typename === 'ModLogsTargetedActionsError') {
                    modLogs[key] = {
                        __typename: 'ModLogsTargetedActionsConnection',
                        count: 0,
                        edges: [],
                        pageInfo: { __typename: 'PageInfo', hasNextPage: false },
                    };
                }
            });
        }
        return response;
    });

    // Queried site-wide, so only touched on the viewer card page to keep the effect
    // contained. The fields are aliased (permission0, permission1, ...) and their meaning is
    // not visible in the persisted query, so every boolean is flipped rather than a specific
    // one. UserHasChannelPermission was tried here too and turned out not to be needed.
    gqlClient.setResponseHook('ChannelPermissionSet', async(request, response) => {
        if (!isViewerCardPage()) return response;
        const channel = response?.data?.channel;
        if (isRecord(channel)) {
            Object.keys(channel)
                .filter(key => /^permission\d+$/.test(key))
                .forEach(key => assignPropertyIfValid(channel, key, true));
        }
        return response;
    });

    gqlClient.setResponseHook('UserModStatus', async(request, response) => {
        isModerator = (response?.data?.user?.isModerator as unknown) === true;
        postMessage();

        if (!assignPropertyIfValid(response?.data?.user, 'isModerator', true)) {
            console.log('could not modify UserModStatus response.');
        }
        return response;
    });

    gqlClient.setResponseHook('CurrentUserModeratorStatus', async(request, response) => {
        isModerator = (response?.data?.user?.self?.isModerator as unknown) === true;
        postMessage();

        if (!assignPropertyIfValid(response?.data?.user?.self, 'isModerator', true)) {
            console.log('could not modify CurrentUserModeratorStatus response.');
        }
        return response;
    });
};
