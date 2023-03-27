import Header from './layout/Header/Header'
import Main from 'layout/Main/Main';
import EntrySection from 'layout/EntrySection/EntrySection';

import styles from './App.module.scss';
import GetSection from 'layout/GetSection/GetSection';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main>
        <EntrySection />
        <GetSection />
      </Main>
    </div>
  );
}

export default App;
