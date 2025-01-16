import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
