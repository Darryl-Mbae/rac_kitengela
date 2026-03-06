
type Props = {
    toggleTheme: () => void,
    theme: 'light' | 'dark' | 'auto'

}

function NavBar({toggleTheme}: Props) {
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
    
  )
}

export default NavBar