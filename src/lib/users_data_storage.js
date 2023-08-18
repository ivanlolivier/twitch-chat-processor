import axios from "axios"
import getVariable, { ACCESS_TOKEN, CLIENT_ID } from "./get_variable";

const client_id = getVariable(CLIENT_ID)
const access_token = getVariable(ACCESS_TOKEN)

function apiDecoupler (rawUserData) {
    return {
        id: rawUserData.id,
        login: rawUserData.login,
        displayName: rawUserData.display_name,
        type: rawUserData.type,
        broadcasterType: rawUserData.broadcaster_type,
        description: rawUserData.description,
        profileImageUrl: rawUserData.profile_image_url,
        offlineImageUrl: rawUserData.offline_image_url,
        viewCount: rawUserData.view_count,
        createdAt: rawUserData.created_at,
    }
}

class UsersDataStorage {
    constructor () {
        this.storage = {}
    }
    getUserData (userId) {
        if (!this.storage[userId]) {
            axios({
                url: `https://api.twitch.tv/helix/users?id=${userId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Client-Id": client_id
                }
            })
                .then((response) => {
                    this.storage[userId] = apiDecoupler(response.data.data[0])
                    // console.log(this.storage)
                })
            return apiDecoupler({})
        }
        return this.storage[userId]
    }
}

const userDataStorage = new UsersDataStorage()

export default userDataStorage
