$(document).ready(function() {
    //get value in text field
    const $snipTitle = $('#snip-title');
    const $snipBlock = $('#snip-code');
    const $submitFormBtn = $('.submitForm');
    const $getStorageBtn = $('.getStorageData');
    const $searchStorageBtn = $('.searchSnippet');
    const $searchInput = $('#search-input');
    let $localStorageObj = window.localStorage;

    const createStorageArray = function(trigger, func) {
        let localStorageArray = Object.keys(window.localStorage);
        //console.log(localStorageArray);
        if (trigger === 'storage-search') {
            //get user search term
            let searchKey = $searchInput.val();
            let currentSearch = func;
            return currentSearch(searchKey);
        }
        
    }

    const searchCompare = function(keyToSearch) {
        let currentSearchArray = [];
        let resultObj = {};
        if ($localStorageObj.hasOwnProperty(keyToSearch)){
            for (key in $localStorageObj) {
                if (key === keyToSearch) {
                    resultObj[key] = JSON.parse($localStorageObj[key]);
                    //console.log(resultObj);
                    return  currentSearchArray.push(resultObj);
                }
            }
        } else {
            return currentSearchArray;
        }
    }

    const showStorageData = function(storedata) {
        

        if (storedata.__proto__) {
            console.log('localStorage Object');
        } else {
            let storageEntry = '<div class="storageEntry">';
            storageEntry = storageEntry+'<span class="text-data">';
            storageEntry = storageEntry+`${}`;
            storageEntry = storageEntry+'</span>';
            storageEntry = storageEntry+'</div>';
        }
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
    snipDataObj.prototype.writeToLocalStorage = function() {
        if (typeof(Storage) === 'undefined') {
            alert('Your browser doesn\'t support HTML5 LocalStorage. Some features may not be available. Consider upgrading your browser.');
        }
        let storageValue = JSON.stringify(this.code);
        let storageKey = this.title;

        console.log(storageKey, storageValue);

        try {
            window.localStorage.setItem(storageKey,storageValue);
        } catch(e) {
            if (e === 'QUOTA_EXCEEDED_ERR') {
                alert('Local storage Quota exceeded! Clearing localStorage.')
                localStorage.clear();
                window.localStorage.setItemsetItem(storageKey,storageValue);
            }
        }
        return true;
    }
    const readFromLocalStorage = function(newKey) {
        if (typeof(Storage) === 'undefined') {
            //Browser localStorage not supported
            return null;
        }
        let localStorageValue = JSON.parse(localStorage.getItem(newKey));
        return localStorageValue;
    }
    

    $submitFormBtn.on('click', function(e) {
        e.preventDefault();
        let storageId = $snipTitle.val();
        let snipCode = $snipBlock.val();
        let checkedCurrentVal = readFromLocalStorage(storageId);
        if (checkedCurrentVal === 'null') {
            let currentObj = new snipDataObj(storageId, snipCode);
            currentObj.writeToLocalStorage();
            console.log(currentObj);


        } else {
            alert(`Error! Please use another title. \"${storageId}\" already in use.`);
        }
        
        
    });

    $searchStorageBtn.on('click', function(e){
        e.preventDefault();
        let triggerId = $(this).attr('data-id');
        let searchKey = $searchInput.val();
        console.log(searchKey);
        if (searchKey === '') {
            $('.error').html('Ooops! Missing search title.');
            $searchInput.css({'border':'1px solid red'});
            setTimeout(function() {
                $('.error').html('');
                $searchInput.css({'border':'none'});
            }, 2500)
        } else {
            //createStorageArray
            createStorageArray(triggerId, searchCompare);
        }
        
    });


    $getStorageBtn.on('click', function() {
        let localStorageData = localStorage.getItem('submitForm');
        //append data to dom
        showStorageData(localStorageData);
    });
});