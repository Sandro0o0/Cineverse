// messages.jsx
export function DisplayUserName() {
  const name = "Sandro";
  return <h1>Hello, {name ? name : "User"}!</h1>;
}
