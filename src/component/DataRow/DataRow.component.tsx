import { DataRowTitle, DataRowText } from './DataRow.styles';

interface DataRowProps {
  title: string;
  text: string;
  textColor?: string;
}

function DataRow({ title, text, textColor }: DataRowProps) {
  return (
    <div>
      <DataRowTitle>{title}</DataRowTitle>
      <DataRowText color={textColor}>{text}</DataRowText>
    </div>
  );
}

DataRow.defaultProps = {
  textColor: 'text.secondary',
};

export default DataRow;
