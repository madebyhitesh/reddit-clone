import DataLoader from 'dataloader';
import { User, UserModal } from '../entity/User';

export const getUserLoader = new DataLoader<string, User>(

    async (keys) => {
        // console.log("keys", keys)

        const users = await UserModal.find({ "_id": { $in: keys as string[] } })

        // console.log("users", users)
        
        const userIdToUser: Record<string, User> = {}

        users.forEach((u) => {
            userIdToUser[u._id] = u;
        });

        // console.log("userIdtouser", userIdToUser)

        const sortedUsers = keys.map((userId) => userIdToUser[userId]);

        // console.log("sortedUser", sortedUsers)
        return sortedUsers
    }
)
