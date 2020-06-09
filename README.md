# Ｍy Restaurant List! 
### Add your favorite restaurants
#### Create your restaurant list now!

## NEW Update!!!
### 新增註冊與登入功能

管理專屬於你的餐廳清單！

使用以下帳號密碼試用，或是註冊一組新帳號開始使用
```
 user1@example.com
 12345678
```
```
user2@example.com
12345678
```

[try My restaurant list now](https://arcane-brushlands-46620.herokuapp.com/users/login)



## **Features**
- [x] click LOGO on upper left of page to back to index
- [x] click restaurant info card to see more information 
- [x] click phone number to call
- [x] search restaurant with keyword of cuisine category
- [x] search restaurant with name
- [x] Not found page when search nothing

### NEW update
- [x] you can create new restaurant to list
- [x] edit your restaurant list
- [x] delete data
- [x] modify search system
- [x] confirm window tip when delete restaurant
- [x] sort by name, date or rating
<br></br>

<br></br>

![navbar](https://i.imgur.com/NSC1hFf.png)
![index](https://i.imgur.com/MuhDpep.png)

<br></br>

![showpage](https://i.imgur.com/h6pw1hj.png)

#### The restaurant information contain below :
1. Rating
2. Introduction
3. Address
4. Phone number 
5. Google Map location
   
<br>

   
![form](https://i.imgur.com/lKUZI3B.png)


<br>

## Prerequisites
[Node.js](https://nodejs.org/en/) (v10.15.0)

[MongoDB](https://www.mongodb.com/)


## Installation to Local

[Download](https://github.com/schiafang/restaurant-list-project/archive/master.zip) or clone repository to your local computer.
```
$ git clone https://github.com/schiafang/restaurant-list-project.git
```
Install express
```
$ npm i express
```

Add .env to use Facebook passport
1. Login [Facebook Developers](https://developers.facebook.com/) 
2. Add your application: **Facebook Login**
3. add .env file on ./
4. Fill in the following information in .env

```
FACEBOOK_APP_ID=<Your Facebook app ID>
FACEBOOK_APP_SECRET=<Your Facebook app secret>
FACEBOOK_CALLBACK=<Your Facebook callback url>
SESSION_SECRET=<Your session secret>
PORT=3000
```

Require seeder
```
$ npm run seed
```

Execute
```
$ npm start
```

`The server listening on localhost:3000`, `MongoDB connected!`

will show on terminal when server connect success.

#### Browse [http://localhost:3000](http://localhost:3000) 


<br>

---
![](https://img.shields.io/badge/%E9%80%99%E5%80%8B-%E6%A8%99%E7%B1%A4-%3CCOLOR%3E) ![](https://img.shields.io/badge/%E5%A5%BD-%E5%83%8F-yellow) ![](https://img.shields.io/badge/%E5%BE%88-%E5%8E%B2%E5%AE%B3-blue)