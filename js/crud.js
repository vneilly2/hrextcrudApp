$(document).ready(function() {
    //get value in text field
    const $snipTitle = $('#snip-title');
    const $snipBlock = $('#snip-code');
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
    const snipDataObj = function(title, code) {
        this.title = title;
        this.code = code;
        this.now = new Date();
    }

    $submitFormBtn.on('click', function(e) {
        e.preventDefault();
        let storageId = $snipTitle.val();
        let snipCode = $snipBlock.val();
        let currentObj = new snipDataObj(storageId, snipCode);
        localStorage.setItem(storageId, currentObj.code);
        console.log(currentObj);
    });

    $getStorageBtn.on('click', function() {
        let localStorageData = localStorage.getItem('submitForm');
        //append data to dom
        showStorageData(localStorageData);
    });
});