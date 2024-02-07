import { LightningElement, wire, track} from 'lwc';
import getaccountList from '@salesforce/apex/TreeGridController.getaccountList'
const gridColumns=[
    {
        type: 'text',
        fieldName: 'Name',
        label: 'Account Name',
    },
    {
        type: 'phone',
        fieldName: 'Phone',
        label: 'Phone Number',
    },
];

export default class AccountTreeGrid extends LightningElement {
    accList;
    @track
    gridColumns=gridColumns;

    @wire(getaccountList) 
    wiredAccounts({data,error})
    {
        if(data){
            console.log('data ===> ',data);
            let tempData = JSON.parse(JSON.stringify(data));
            // console.log('tempData ===> ',tempData);
            // for(let i=0; i<tempData.length; i++){
            //     tempData._children = tempData[i]['Contacts'];
            //     delete tempData[i]['Contacts'];
            // }
            tempData.forEach(element => {
                if(element.Contacts){
                    element._children = element.Contacts;
                    delete element.contacts;
                }
            });
            this.accList= tempData;
            console.log('accList ===>',this.accList);
        }
        if(error){
            console.log(error);
        }
    }

    connectedCallback(){    
    }
}