import React from 'react';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
    Resize,
} from '@syncfusion/ej2-react-richtexteditor';

const toolbarSettings = {
    items: [
        'Bold',
        'Italic',
        'Underline',
        'StrikeThrough',
        'FontName',
        'FontSize',
        'FontColor',
        'BackgroundColor',
        'LowerCase',
        'UpperCase',
        '|',
        'Formats',
        'Alignments',
        'OrderedList',
        'UnorderedList',
        'Outdent',
        'Indent',
        '|',
        'CreateLink',
        'Image',
        '|',
        'ClearFormat',
        'Print',
        'SourceCode',
        'FullScreen',
        '|',
        'Undo',
        'Redo',
    ],
    type: 'Expand',
};

function Editor({ label, onChange, containerStyle, content, value }) {
    return (
        <div className={`${containerStyle}`}>
            <label className={'input-lable'}>{label}</label>
            <RichTextEditorComponent
                height='250px'
                change={onChange}
                ref={(richtexteditor) => {
                    content = richtexteditor;
                }}
                value={value}
                toolbarSettings={toolbarSettings}
            >
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, Resize]} />
            </RichTextEditorComponent>
        </div>
    );
}

export default Editor;
