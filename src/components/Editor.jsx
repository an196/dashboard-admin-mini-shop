import React from 'react';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
    Resize
} from '@syncfusion/ej2-react-richtexteditor';

function Editor({ label, onChange, containerStyle, content }) {

    return (
        <div className={`input-container-row ${containerStyle}`} >
            <label className={ 'input-lable'}>{label}</label>
            <RichTextEditorComponent height='250px' change={onChange} ref={(richtexteditor) => { content = richtexteditor; }}>
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, Resize]}  />
               
            </RichTextEditorComponent>
        </div>
    );
}

export default Editor;
