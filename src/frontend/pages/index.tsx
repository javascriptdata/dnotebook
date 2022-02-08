import type { NextPage } from 'next';
import Head from 'next/head';
import MenuBar from '../components/MenuBar/notebookOptionsBar';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useSelector } from "react-redux";
import { AppState } from '../lib/typings/types';
import lightTheme from '../styles/themes/lightTheme';
import darkTheme from '../styles/themes/darkTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Notebook from '../components/Notebook';
import NotebookTabPanel from '../components/NotebookTabPanel';

const Home: NextPage = () => {
  const { config } = useSelector((state: { app: AppState }) => state.app)

  return (
    <ThemeProvider theme={config.notebookThemeMode == "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div>
        <Head>
          <title>Dnotebook - Exciting Notebook experience</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='flex-row'>
          <section>
            <NavBar />
          </section>
          <section>
            <MenuBar />
          </section>

          <section style={{ height: "650px" }} className='grid overflow-y-scroll'>
            <div className='fixed'>
              <SideBar />
            </div>
            <div>
              <NotebookTabPanel />
              <Notebook />
            </div>
          </section>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Home
