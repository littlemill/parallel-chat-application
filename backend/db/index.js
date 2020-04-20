const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:12345@database-pwl4t.mongodb.net/test?retryWrites=true&w=majority";

const User = require('./models/user-model')
const Group = require('./models/group-model')
const GroupMember = require('./models/groupmember-model')
const Chat = require('./models/chat-model')

const util = require('../util')

const apiport = 3000

const io = require('socket.io').listen(apiport)
console.log('listening on API port:', apiport)

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

//mock-data 

// var mill = new User({name: 'littlemill'})
// var yin = new User({name: 'yin_kiatsilp'})
// var nut = new User({name: 'nnnnnnutt'})
// var tien = new User({name: 'xntien'})
// var jane = new User({name: 'janejira_jira'})
//var a = new User({name:'a'})
//a.save()

// mill.save()
// yin.save()
// nut.save()
// tien.save()
// jane.save()

// var group1 = new Group({name: 'konsuaysuay'})
// var group2 = new Group({name: 'parallel-dist'})
// var group3 = new Group({name: 'ComEngCp44'})

// group1.save()
// group2.save()
// group3.save()

// new GroupMember({group: 'konsuaysuay',member: 'littlemill'}).save()
// new GroupMember({group: 'konsuaysuay',member: 'yin_kiatsilp'}).save()
// new GroupMember({group: 'konsuaysuay',member: 'nnnnnnutt'}).save()
// new GroupMember({group: 'konsuaysuay',member: 'xntien'}).save()
// new GroupMember({group: 'konsuaysuay',member: 'janejira_jira'}).save()

// new GroupMember({group: 'parallel-dist',member: 'littlemill'}).save()
new GroupMember({ group: 'parallel-dist', member: 'a' }).save()

// new GroupMember({group: 'ComEngCp44',member: 'nnnnnnutt'}).save()
// new GroupMember({group: 'ComEngCp44',member: 'xntien'}).save()
// new GroupMember({group: 'ComEngCp44',member: 'janejira_jira'}).save()

// new Chat({    user: 'littlemill' ,group: 'konsuaysuay',timestamp: new Date('April 11, 2020 11:11:00'),message: 'hi beautiess ! xoxo'}).save()

// var query = Group.find()
// query.then(function(group))

function userLogin(username, socket) {
    User.find({ name: username }, function (err, users) {
        if (err) {
            console.log(err);
        }
        if (!users.length) {
            console.log("Not found in DB; Create new user")
            const user = new User({ name: username });
            user
                .save()
                .then(() => {
                    console.log("Created User")
                })
                .catch(error => console.log(error))
        }
        retrieveMessages(socket);
        GroupInfo(username, socket)
    })
}

async function GroupInfo(username, socket) {
    var allGroup = await getGroupList();
    var allJoinedGroup = await getJoinedGroupList(username);
    console.log(allGroup)
    console.log(allJoinedGroup)
    socket.emit("groupinfo", { group: allGroup, joinedGroup: allJoinedGroup });
}

async function getGroupList() {
    var groupList = []
    var group = await Group.find({})
    var groupdata
    for (groupdata in group) {
        groupList.push(group[groupdata].name)
    }
    return groupList
}

async function getJoinedGroupList(username) {
    var joinedgroupList = []
    var group = await GroupMember.find({ member: username })
    console.log(group)
    var groupdata
    for (groupdata in group) {
        joinedgroupList.push(group[groupdata].group)
    }
    return joinedgroupList
}


function getAllMessages(groupList) {
    var chatByGroup = {}
    var groupName
    for (groupName in groupList) {
        Chat.find({ group: groupName }).sort('timestamp').exec(function (err, message) {
            chatByGroup[groupName] = message.map((msgitem, idx) => {
                return { user: msgitem.name, time: util.timeformatter(msgitem.time), message: msgitem.message }
            })
        })
    }
    return chatByGroup
}

function retrieveMessages(socket) {
    console.log('retrieving')
    var groupList = getGroupList()
    var chatByGroup = getAllMessages(groupList)
    socket.emit('all messages', chatByGroup)
}

function broadcastMessages(socket) {
    var groupList = getGroupList()
    var chatByGroup = getAllMessages(groupList)
    io.emit('all messages', chatByGroup)
}

io.on('connection', (socket) => {
    console.log('connected...');

    socket.on('login', function (username) {
        console.log(username + " logged in");
        userLogin(username, socket);
    });

    socket.on('send', (data) => {
        var chat = new Chat(data)
        chat.save(function (err) {
            if (err) {
                return err;
            }
            console.log("[" + data.group + "] " + data.time + " " + data.user + ":" + data.message);
            broadcastMessages(socket);
        });

    })
    socket.on('join', (data) => { // data = {group,member}
        // GroupMember.find({data}), function(err,joingroup) {
        //     if(joingroup.length){
        //         console.log("already joined")
        //     }
        //     else{
        //         var joinedGroup = new GroupMember(data)
        //         joinedGroup.save(function(err){
        //             if (err) {
        //                 return err;
        //             }
        //             console.log(data.member+" joined "+data.group)  
        //             GroupInfo(data.member,socket);
        //         });
        //         retrieveMessages(socket); 
        //     }
        // }
        var joinedGroup = new GroupMember(data)
        joinedGroup.save(function (err) {
            if (err) {
                return err;
            }
            console.log(data.member + " joined " + data.group)
            GroupInfo(data.member, socket);
        });
        //retrieveMessages(socket); 
    })

    socket.on('leave', (data) => { //data = {member,group}
        GroupMember.remove(data, (err) => { //Remove All Documents that Match a Condition
            if (err) {
                return err;
            }
            console.log(data.member + " left " + data.group)
            GroupInfo(data.member, socket);
        });

    })
    socket.on('create', (data) => { //data = {member,group}
        new Group({ name: data.group }).save((err) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log('new group: ', data.group, ' is created.')
            io.emit('groupcreation completed')
        })
        new GroupMember({ group: data.group, member: data.member }).save()
    })

    socket.on('getGroupUpdates', (data) => { //data = {name} --> user
        GroupInfo(data, socket)
        // retrieveMessages(socket)
    })

    socket.on('fetchMessages', (data) => {
        console.log('fetching....')
        retrieveMessages(socket)
    })

    socket.on('log out', (data) => { //data = {name} --> user
        console.log(data)
        socket.emit('user disconnected')
        console.log('user: ', data, ' disconnected')
    })
});

module.exports = db