import React from 'react'

const authContext = React.createContext({
  authenticated: false,
  changeTheme: () => {},
  themeDark: 'Dark',
  changeHeaderColor: (success) => {},
  headerChange: false
})

export default authContext
