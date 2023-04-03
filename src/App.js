import UserContextProvider from 'context/UserContext';
import Header from './layout/Header/Header'
import Main from 'layout/Main/Main';
import EntrySection from 'layout/EntrySection/EntrySection';
import GetSection from 'layout/GetSection/GetSection';
import PostSection from 'layout/PostSection/PostSection';
import Tooltip from 'components/Tooltip/Tooltip';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main>
        <EntrySection />
        <UserContextProvider>
          <GetSection />
          <PostSection />
        </UserContextProvider>
      </Main>

      <Tooltip />
    </div>
  );
}

export default App;
