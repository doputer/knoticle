import Editor from '@components/write/Editor';
import Preview from '@components/write/Preview';
import WriteBar from '@components/write/WriteBar';
import WriteHead from '@components/write/WriteHead';
import { Flex, FlexColumn } from '@styles/layout';

export default function WritePage() {
  return (
    <>
      <WriteHead />
      <Flex>
        <FlexColumn style={{ flex: 1, height: '100vh' }}>
          <Editor />
          <WriteBar />
        </FlexColumn>
        <Preview />
      </Flex>
    </>
  );
}
