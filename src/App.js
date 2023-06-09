import UsersContextProvider from 'context/UsersContext';
import Header from './layout/Header/Header'
import Main from 'layout/Main/Main';
import EntrySection from 'layout/EntrySection/EntrySection';
import GetSection from 'layout/GetSection/GetSection';
import PostSection from 'layout/PostSection/PostSection';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main>
        <EntrySection />
        <UsersContextProvider>
          <GetSection />
          <PostSection />
        </UsersContextProvider>
      </Main>
    </div>
  );
}

export default App;
