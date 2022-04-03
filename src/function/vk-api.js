import bridge from "@vkontakte/vk-bridge";

export async function fetchUser() {
    return await bridge.send('VKWebAppGetUserInfo')
}