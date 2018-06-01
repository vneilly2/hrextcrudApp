$(document).ready(function() {
    //get value in text field
    const $userTextInput = $('#user-input-field');
    const $submitFormBtn = $('.submitForm');
    const $getStorageBtn = $('.getStorageData');

    const showStorageData = function(storedata) {
        let storageEntry = '<div class="storageEntry">';
        storageEntry = storageEntry+'<span class="text-data">';
        storageEntry = storageEntry+`${storedata}`;
        storageEntry = storageEntry+'</span>';
        storageEntry = storageEntry+'</div>';
        if ($('#data-container').length) {
            $('#data-container').html('');
            $('#data-container').append(storageEntry);
        } else {
            $('.container').append('<div id="data-container"></div>');
            $('#data-container').append(storageEntry);
        }
    }

    $submitFormBtn.on('click', function() {
        let userFormData = $userTextInput.val();
        console.log(userFormData);
        let storageId = $(this).attr('class');
        localStorage.setItem(storageId, userFormData);
    });

    $getStorageBtn.on('click', function() {
        let localStorageData = localStorage.getItem('submitForm');
        //append data to dom
        showStorageData(localStorageData);
    });
});