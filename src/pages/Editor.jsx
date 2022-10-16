import React from 'react';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';

import { EditorData } from '../data/dummy';
import { Header } from '../components';

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

function Editor() {
    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category='App' title='Editor' />
            <RichTextEditorComponent height={450} toolbarSettings={toolbarSettings}>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                <EditorData />
            </RichTextEditorComponent>
        </div>
    );
}

export default Editor;
