import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from './Base/SampleBase';
import React from 'react';

export class AlertModal extends SampleBase {
    dialogInstance;
    constructor(props) {
        super(props);

        this.state = {
            hideDialog: props.showModal
        };
        this.buttonRef = element => {
            this.buttonEle = element;
        };
        this.animationSettings = { effect: 'None' };
        this.buttons = [{
            // Click the footer buttons to hide the Dialog
            click: () => {
                this.dialogInstance.hide();
            },
            // Accessing button component properties by buttonModel property
            buttonModel: {
                //Enables the primary button
                isPrimary: true,
                content: 'OK'
            }
        }];
    }

          
   
    
    dialogClose() {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    }
    dialogOpen() {
        this.buttonEle.style.display = 'none';
    }

    render() {
        return (
            
            <DialogComponent
                id='modalDialog'
                isModal={true}
                buttons={this.buttons}
                header='Software Update'
                width='335px'
                content='Your current software version is up to date.'
                ref={(dialog) => (this.dialogInstance = dialog)}
                target='#target'
                visible={this.state.hideDialog}
                open={this.dialogOpen.bind(this)}
                close={this.dialogClose.bind(this)}
                animationSettings={this.animationSettings}
            ></DialogComponent>
        );
    }
}

export default AlertModal;
