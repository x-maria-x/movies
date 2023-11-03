import React, { Component } from 'react'
import { Flex, Tabs } from 'antd'

import SearchPage from '../searchPage'

import './app.css'

export default class App extends Component {
  tabsItems = [
    {
      key: '1',
      label: 'Search',
      children: <SearchPage />,
    },
    {
      key: '2',
      label: 'Rated',
      children: null,
    },
  ]

  render() {
    return (
      <section className="wrapper">
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
          <Tabs defaultActiveKey="1" items={this.tabsItems} />
        </Flex>
      </section>
    )
  }
}
