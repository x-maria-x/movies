import React, { Component } from 'react'
import { Flex, Tabs } from 'antd'

import TmdbService from '../../services/tmdb-service'
import SearchPage from '../searchPage'
import { GenresList, GuestId } from '../genresListContext/genresListContext'
import './app.css'
import RatedPage from '../ratedPage'

export default class App extends Component {
  state = {
    genresList: [],
    guestId: null,
  }

  tabsItems = [
    {
      key: '1',
      label: 'Search',
      children: <SearchPage />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedPage />,
    },
  ]

  componentDidMount() {
    const moviesService = new TmdbService()

    moviesService.createGuestSession().then((res) => this.setState({ guestId: res.guest_session_id }))
    moviesService.getGenriesList().then((res) => this.setState({ genresList: res }))
  }

  render() {
    return (
      <section className="wrapper">
        <GenresList.Provider value={this.state.genresList}>
          <GuestId.Provider value={this.state.guestId}>
            <Flex
              vertical
              align="center"
              justify="space-between"
              gap={32}
              style={{
                width: '95%',
                margin: '0 auto',
              }}
            >
              <Tabs defaultActiveKey="1" items={this.tabsItems} destroyInactiveTabPane />
            </Flex>
          </GuestId.Provider>
        </GenresList.Provider>
      </section>
    )
  }
}
