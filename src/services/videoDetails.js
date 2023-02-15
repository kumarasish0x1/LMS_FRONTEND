export function getVideoDetails() {
    return fetch('http://localhost:3001/data')
      .then(data => data.json())
}