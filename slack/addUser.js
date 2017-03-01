const addUser = (bot, msg) => {
    const newUserId = msg.match[1];
    // check if user has access
    bot.api.users.info({user: newUserId}, (error, res) => {
        if(error) {
            bot.replyWithTyping(msg, `Error occurred <@${newUserId}> was not found.`);
        }else{
            // TODO: SAVE
            // controller.storage.users.save(res.user, (err) => {
            //     if(err) {
            //         bot.replyWithTyping(msg, `Error occurred <@${newUserId}> was not added to standup.`);
            //     }else{
            //         bot.replyWithTyping(msg, `<@${newUserId}> was added to standup.`);
            //     }
            // });
        };
    });
};
const removeUser = (bot, msg) => {
    const userId = msg.match[1];
    // check if user has access
    // controller.storage.users.remove(userId, (err) => {
    //     if(err) {
    //         bot.replyWithTyping(msg, `Error occurred <@${userId}> was not found.`);
    //     }else{
    //         bot.replyWithTyping(msg, `<@${userId}> was removed from standup.`);
    //     }
    // });
};

module.exports = {
    add: {
        title: 'Add User',
        regex: [/^add-user <@(.+)>$/],
        fn: addUser,
        description: `\`add-user <username>\` Add slack user to standup.`,
    },
    remove: {
        title: 'Remove User',
        regex: [/^remove-user <@(.+)>$/],
        fn: removeUser,
        description: `\`remove-user <username>\` Remove slack user from standup.`,
    },
};
