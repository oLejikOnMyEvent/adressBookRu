
let userObjFirtst = localStorage.getItem('gorupsObj');
let gorupsObj = JSON.parse(userObjFirtst)

if (!gorupsObj) {
    gorupsObj = []

}

qOne('.addNewUserGroupButton').addEventListener('click', function () {

    let addNewUserGroupName = qOne('.addNewUserGroupName').value

    let reg= /[0-9]/
    let regEn =/[a-zA-Z]/
if(reg.test(addNewUserGroupName) || regEn.test(addNewUserGroupName)){
    alert('нельзя цифры вводить и английские символы')
} else {
    deleteAll('.AddedUserGroup')
    gorupsObj.push(addNewUserGroupName);

    localStorage.setItem('gorupsObj', JSON.stringify(gorupsObj));
   
    showAllGroups(gorupsObj)
    deleteAll('.selectGroupOption')

    AddDataToSelect(gorupsObj, 'selectGroupOption', '.groupSelect')

    deleteAll('.selectGroupOptionDelete')
    AddDataToSelect(gorupsObj, 'selectGroupOptionDelete', '.deleteNewUserGroupSelect')
    deleteAll('.UserButton')
    showAll(userObj)
}
})




qOne('.deleteNewUserGroupButton').addEventListener('click', function () {
    let deleteNewUserGroupSelect = qOne('.deleteNewUserGroupSelect').value

    let findIOndex = gorupsObj.indexOf(deleteNewUserGroupSelect)
    deleteAll('.selectGroupOptionDelete')
    deleteAll('.AddedUserGroup')
    gorupsObj.splice(findIOndex, 1)

    localStorage.setItem('gorupsObj', JSON.stringify(gorupsObj));

   
    for(let i in userObj){
        if(userObj[i].groupName == deleteNewUserGroupSelect){
            userObj[i].groupName = 'Без группы'
        }
      }

 
      deleteAll('.UserButton')
    localStorage.setItem('userObj', JSON.stringify(userObj));

   
    showAllGroups(gorupsObj)
    showAll(userObj)
    deleteAll('.selectGroupOption')
    AddDataToSelect(gorupsObj, 'selectGroupOption', '.groupSelect');
    AddDataToSelect(gorupsObj, 'selectGroupOptionDelete', '.deleteNewUserGroupSelect');
 

})

qOne('.deleteNewUserGroupSelect').addEventListener('click', AddDataToSelect(gorupsObj, 'selectGroupOptionDelete', '.deleteNewUserGroupSelect'))

function AddDataToSelect(gorupsObj, className, selectElement) {
    let select = qOne(selectElement);
    for (let i in gorupsObj) {
        let selectGroup = document.createElement('option');;
        selectGroup.innerHTML = gorupsObj[i];
        selectGroup.className = className
        select.appendChild(selectGroup);
    }
}

qOne('.groupSelect').addEventListener('click', AddDataToSelect(gorupsObj, 'selectGroupOption', '.groupSelect') )



let firtst = localStorage.getItem('userObj');

let userObj = JSON.parse(firtst)

let allUsers = qOne('.Users')
// qOne('.addNewUserGroup').addEventListener('click', function () {

// })


function showAllGroups(item) {


    for (let i in item) {

        let newDivUser = document.createElement('div')
        newDivUser.className = `${item[i]} AddedUserGroup`
        allUsers.appendChild(newDivUser)

        let newH3User = document.createElement('h3')
        newH3User.innerHTML = `${item[i]}`
        newDivUser.appendChild(newH3User)
    }
}
showAllGroups(gorupsObj)


if (!userObj) {
    userObj = []

}



function qOne(item) {
    return document.querySelector(item)
}

function qAll(items) {
    return document.querySelectorAll(items)
}






let allMobile = qOne('.mobile')


let phonesArr = []
let currnetUser;
let mobilePhones;



function showAll(userObj) {



    for (let i = 0; i < userObj.length; i++)



    {
        let newDiv = document.createElement('div');
        newDiv.className = 'User';



        let groupNameAppendVar = userObj[i].groupName

        // console.log(groupNameAppendVar);
        let reg = /[a-zA-Z]/
        
        if (groupNameAppendVar == 'Без группы' || groupNameAppendVar == '' || groupNameAppendVar == null || !groupNameAppendVar || groupNameAppendVar == 'Группа' || reg.test(groupNameAppendVar)) {
            qOne('.БезГруппы').appendChild(newDiv)
        } else {
            let groupNameAppend = qOne(`.${userObj[i].groupName}`)
            groupNameAppend.appendChild(newDiv)
        }



        let newP = document.createElement('button');
        newP.innerHTML = `${userObj[i].name} ${userObj[i].seName}`
        newP.className = 'UserButton'
        newDiv.appendChild(newP)



        newP.addEventListener('click', function showMobilePhones1() {

            phonesArr = [];
            deleteAll('.MobilePhone');

            let save = qOne('.AddSaveBtn')

            save.className = 'AddSaveBtn Save'

            save.innerHTML = 'Сохранить'
            qOne('.addNewUser').style.visibility = 'visible'
            qOne('.buttonsAddCloseDel').style.visibility = 'visible'

            qOne('.addNewUserName').value = `${userObj[i].name}`
            qOne('.addNewUserSeName').value = `${userObj[i].seName}`



            currnetUser = i;
            mobilePhones = userObj[i].phoneNumber




            for (let j in userObj[i].phoneNumber) {

                showPhones(userObj, i, j)


            }
        })


    }

}




function showPhones(userObj, i, j) {

    let newDiv = document.createElement('div');
    newDiv.className = 'MobilePhone'
    allMobile.appendChild(newDiv)



    let newSpanPhoneStatus = document.createElement('span');
    newSpanPhoneStatus.innerHTML = ` ${userObj[i].phoneNumber[j].status} `
    newSpanPhoneStatus.className = 'MobilePhoneSelectData'
    newDiv.appendChild(newSpanPhoneStatus);

    let newSpanPhone = document.createElement('span');
    newSpanPhone.innerHTML = ` ${userObj[i].phoneNumber[j].phone} `
    newSpanPhone.className = 'MobilePhoneInputData'
    newDiv.appendChild(newSpanPhone);


    let newButtonDel = document.createElement('button');
    newButtonDel.innerHTML = 'x';
    newButtonDel.className = 'mobileDelete'
    newDiv.appendChild(newButtonDel);

    newButtonDel.addEventListener('click', function () {
        newDiv.remove();


    })
}


qOne('.addNewPhone').addEventListener('click', function () {

    let selectData = document.querySelector('.mobileSelect').value;



    let inputData = document.querySelector('.mobileInput').value;


    let newDiv = document.createElement('div')
    newDiv.className = "MobilePhone"
    document.querySelector('.mobile').append(newDiv)

    let newSpanPhone = document.createElement('span')
    newSpanPhone.innerHTML = ' Телефон '
    newSpanPhone.className = "MobilePhoneTelephone"
    newDiv.appendChild(newSpanPhone)

    let newSpanSelectData = document.createElement('span')
    newSpanSelectData.innerHTML = ` ${selectData} `
    newSpanSelectData.className = 'MobilePhoneSelectData'
    newDiv.appendChild(newSpanSelectData)

    let newSpanInputDate = document.createElement('span')
    newSpanInputDate.innerHTML = ` ${inputData} `
    newSpanInputDate.className = 'MobilePhoneInputData'
    newDiv.appendChild(newSpanInputDate)

    let newSpanButton = document.createElement('button')
    newSpanButton.className = "mobileDelete"
    newSpanButton.innerHTML = 'x'
    newDiv.appendChild(newSpanButton)

    newSpanButton.addEventListener('click', function () {
        newDiv.remove();


    })



    qOne('.mobileInput').value = null


    phonesArr.push({
        phone: inputData,
        status: selectData
    })




})



showAll(userObj)


function deleteUser(index) {
    deleteAll('.User')
    userObj.splice(index, 1);
    showAll(userObj);
}




function deleteAll(items) {
    let allUsersDelete = qAll(items)

    const removeElements = (elms) => elms.forEach(el => el.remove());

    removeElements(allUsersDelete);

}

qOne('.closeNewUserBtn').onclick = function () {
    qOne('.addNewUser').style.visibility = 'hidden'
    qOne('.buttonsAddCloseDel').style.visibility = 'hidden'

    deleteAll('.MobilePhone')


}

qOne('.deleteUserBtn').addEventListener('click', () => {
    qOne('.addNewUser').style.visibility = 'hidden'

    qOne('.buttonsAddCloseDel').style.visibility = 'hidden'

    deleteAll('.MobilePhone')

    qOne('.mobileInput').value = null;


    deleteUser(currnetUser)

    localStorage.setItem('userObj', JSON.stringify(userObj));
})




qOne('.addNewUserButton').onclick = function () {
    qOne('.addNewUser').style.visibility = 'visible'
    qOne('.buttonsAddCloseDel').style.visibility = 'visible'

    let add = qOne('.AddSaveBtn');
    add.className = "AddSaveBtn Add";
    add.innerHTML = 'Добавить Человека';

    qOne('.addNewUserName').value = null
    qOne('.addNewUserSeName').value = null

    qOne('.mobileInput').value = null;
    deleteAll('.MobilePhone')

    currnetUser = userObj.length + 1



}




qOne('.AddSaveBtn').addEventListener('click', function (event) {
    let phonesArrs = []

    if (this.className == 'AddSaveBtn Add') {

        let name = qOne('.addNewUserName').value


        let seName = qOne('.addNewUserSeName').value

        let userGroupName = qOne('.groupSelect').value







        if (name != '' || seName != '') {
            let userObjLeb = userObj.length + 1

            let allphones = qAll('.MobilePhoneInputData')
            let allstatus = qAll('.MobilePhoneSelectData')


            for (let i = 0; i < allphones.length; i++) {
                phonesArrs.push({
                    phone: allphones[i].textContent,
                    status: allstatus[i].textContent
                });
            }

            testobj = {
                id: userObjLeb,
                name: name,
                seName: seName,
                phoneNumber: phonesArrs,
                groupName: userGroupName
            }


            deleteAll('.User');


            userObj.push(
                testobj
            )

            showAll(userObj);

            localStorage.setItem('userObj', JSON.stringify(userObj));


            qOne('.addNewUserName').value = null
            qOne('.addNewUserSeName').value = null
            deleteAll('.MobilePhone')
            qOne('.mobileInput').value = null;
        } else alert('введите либо имя либо фамилию ')
    } else {


        let name = qOne('.addNewUserName').value

        let seName = qOne('.addNewUserSeName').value


        let userGroupName = qOne('.groupSelect').value



        deleteAll('.User');
        let allphones = qAll('.MobilePhoneInputData')
        let allstatus = qAll('.MobilePhoneSelectData')

        for (let i = 0; i < allphones.length; i++) {
            phonesArrs.push({
                phone: allphones[i].textContent,
                status: allstatus[i].textContent
            });
        }

        let id = userObj.length + 1;


        userObj.splice(currnetUser, 1, {
            id: id,
            name: name,
            seName: seName,
            phoneNumber: phonesArrs,
            groupName: userGroupName
        })

        localStorage.setItem('userObj', JSON.stringify(userObj));


        showAll(userObj);



        alert('Изменения сохранены')
    }


})


let serachUser = qOne('.SearchUserInput');
serachUser.addEventListener('input', function () {

    let searchUserValue = serachUser.value.toLowerCase()

    deleteAll('.User')
    let filterUsersName = userObj.filter(function (item) {

        let itemName = item.name.toLowerCase();

        let itemSeName = item.seName.toLowerCase();


        if (itemName.indexOf(searchUserValue) !== -1) {
            return itemName.startsWith(searchUserValue)
        } else if (itemSeName.indexOf(searchUserValue) !== -1)
            return itemSeName.startsWith(searchUserValue)



    })


    showAll(filterUsersName)
})