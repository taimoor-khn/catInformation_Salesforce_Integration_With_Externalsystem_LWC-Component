import { LightningElement, track } from 'lwc';
import LightningAlert from 'lightning/alert';
export default class CatInfoComponent extends LightningElement {


    /////Requirement 1 fetching the name,origin,image and family friendly score from api response 
    @track catName = '';
    @track catData;
    @track error;
    @track name;
    @track origin;
    @track imageURL;
    @track family_friendly_Score;




    handleInputChange(event) {
        console.log(event.target.value);
        this.catName = event.target.value;
    }


    ///////onlcik to search the cat on the name base
    searchCat() {
        this.error = null;
        this.catData = null;

        if (!this.catName) {
            LightningAlert.open({
                message: 'Please enter a cat name.',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });

            return;
        }
        console.log('Cat Name : ' + this.catName);
        const endpoint = `https://api.api-ninjas.com/v1/cats?name=${this.catName}`;
        console.log('End Point : ' + endpoint);
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'X-Api-Key': '' // optional custom header
            }
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                LightningAlert.open({
                    message: 'HTTP error! status: ' + response.status,
                    theme: 'error', // a red theme intended for error states
                    label: 'Error!', // this is the header text
                });

            }
            return response.json();
        }).then(data => {

            console.log('API response:', data);
            console.log(data.length);
            if (data.length > 0) {
                console.log('data [0]', data[0]);
                console.log('cat name', data[0].name);
                console.log('origin : ' + data[0].origin);
                console.log('origin : ' + data[0].image_link);
                console.log('origin : ' + data[0].family_friendly);
                this.name = data[0].name;
                this.origin = data[0].origin;
                this.imageURL = data[0].image_link;
                this.family_friendly_Score = data[0].family_friendly;
                this.catData = true;
            }
            else {
                LightningAlert.open({
                    message: 'No Rsponse from the Server',
                    theme: 'error', // a red theme intended for error states
                    label: 'Error!', // this is the header text
                });

            }

        }).catch(error => {
            LightningAlert.open({
                message: 'API call failed:', error,
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });

        });

    }


    /////Requirement 2 select a level of family friendliness. for the selection of cat breed list
    @track scoreLevel;
    @track selectedValue = '';
    @track catList = [];
    options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' }
    ];

    handleChange(event) {
        console.log(event.target.value);
        this.selectedValue = event.target.value;

    }

    searchFriendlyCat() {
        this.catList = null;
        if (!this.selectedValue) {
            LightningAlert.open({
                message: 'Please Select one Option',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });

            return;
        }
        const endpoint = `https://api.api-ninjas.com/v1/cats?family_friendly=${this.selectedValue}`;
        console.log('End Point : ' + endpoint);
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'X-Api-Key': '' // optional custom header
            }
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {

            console.log('API response:', data);
            console.log(data.length);
            if (data.length > 0) {
                this.catList = data;
            }
            else {
                LightningAlert.open({
                    message: 'No Rsponse from the Server',
                    theme: 'error', // a red theme intended for error states
                    label: 'Error!', // this is the header text
                });

            }

        }).catch(error => {
            LightningAlert.open({
                message: 'API call failed:', error,
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });

        });
    }
}
