const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:12345@database-pwl4t.mongodb.net/test?retryWrites=true&w=majority";

const User = require('./models/user-model')
const Group = require('./models/group-model')
const GroupMember = require('./models/groupmember-model')
const Chat = require('./models/chat-model')

const apiport = 3000

const io = require('socket.io').listen(apiport)
console.log('listening on API port:',apiport)

mongoose
    .connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })
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
// new GroupMember({group: 'parallel-dist',member: 'yin_kiatsilp'}).save()

// new GroupMember({group: 'ComEngCp44',member: 'nnnnnnutt'}).save()
// new GroupMember({group: 'ComEngCp44',member: 'xntien'}).save()
// new GroupMember({group: 'ComEngCp44',member: 'janejira_jira'}).save()

// new Chat({    user: 'littlemill' ,group: 'konsuaysuay',timestamp: new Date('April 11, 2020 11:11:00'),message: 'hi beautiess ! xoxo'}).save()

// var query = Group.find()
// query.then(function(group))

function userLogin(username,socket) { 
  User.find({name:username},function(err,users){
    if (err) {
        console.log(err);
    }
    if(!users.length) { 
      console.log("Not found in DB; Create new user")
      const user = new User({name:username});
      user
        .save()
        .then(() => {
            console.log("Created User")
        })
        .catch(error => console.log(error))
    }
    // EmitAllChats(socket);
    GroupInfo(username,socket)
  })
}

function GroupInfo(username,socket){
    var allGroup = [];
    var allJoinedGroup = [];
    Group.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data.length) {
            console.log("Group not found")
        }
        var group
        for(group in data){
            allGroup.push(group.name);
        }
    }).catch(error => console.log(error))

    GroupMember.find({member: username}, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) {
            console.log("Joined Group not found")
        }
        var joinedgroup
        for(joinedgroup in data){
            allGroup.push(joinedgroup.name);
        }
    }).catch(error => console.log(error))

    socket.emit("groupinfo",{group:allGroup, joinedGroup:allJoinedGroup});
}


module.exports = db