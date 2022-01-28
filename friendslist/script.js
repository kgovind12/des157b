(function() {
    'use strict';

    Parse.initialize("ZXk7p0sjOUIkw65CImRknB4Ch6LWNChf6N2tQ4yu","IqPeWXGxmWbnQj9J07I4GKwwfeObFDqyG229W9wa");
    Parse.serverURL = 'https://parseapi.back4app.com/'

    const newBtn = document.getElementById('newbtn');
    const addFriendForm = document.getElementById('add-friend');
    const editFriendForm = document.getElementById('edit-friend');
    const friendList = document.querySelector('main ol');

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);

        try {
            const results = await query.ascending('lname').find();
            console.log(results);

            results.forEach(function(friend) {
                const id = friend.id;
                const lname = friend.get('lname');
                const fname = friend.get('fname');
                const email = friend.get('email');
                const facebook = friend.get('facebook');
                const twitter = friend.get('twitter');
                const instagram = friend.get('instagram');
                const linkedin = friend.get('linkedin');

                const listItem = document.createElement('li');
                listItem.setAttribute('id', `r-${id}`);
                listItem.innerHTML = `             
                <div class="name">
                    ${fname} ${lname}
                </div>
                <div class="email">
                    <i class="fas fa-envelope-square"></i> ${email}
                </div>
                <div class="social">
                    <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                    <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                    <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                    <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                </div>
                <i class="fas fa-edit" id="e-${id}"></i>
                <i class="fas fa-times-circle" id="d-${id}"></i>`;

                friendList.append(listItem);

                const editBtns = document.querySelectorAll('.fa-edit');

                for (let editBtn of editBtns) {
                    editBtn.addEventListener('click', function(event) {
                        event.preventDefault();
                        editFriendForm.className = 'edit-friend-onscreen';
                    });
                }
            });
        } catch(error) {
            console.log('Error getting friends: ', error);
        }
    }

    displayFriends();

    newBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    addFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-offscreen';
    });

    editFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    });
})();
