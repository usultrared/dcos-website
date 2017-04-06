const json = require('../demos.json')

function getItems (query) {
  return query
    ? json.filter(item => {
      return (item.packages.map(hash).indexOf(hash(query)) > -1) || (item['dcos_version'].indexOf(query) > -1)
    })
    : json
}

function hash (name) {
  return name.replace(/\s+/g, '-').toLowerCase()
}

function getQuery () {
  const query = window.location.hash.split('#')
  const q = query[1]

  return q // string or undefined
}

function clean () {
  $(".demos-cards").empty()
}

function render (items) {
  items.forEach(demo => {
    $(".demos-cards").append(
      `
      <div class="card card-content col-4 left-align bg-white has-footer">
        <div class="card-header" style="background-image: url(${window.location.protocol + '//' + window.location.host + demo.image})"></div>
        <h4 class="mt3 mb1">${demo.title}</h4>
        <a href="#${demo.dcos_version}" class="pill bg-indigo block ml2 border-box my0">DC/OS ${demo.dcos_version.toString()}</a>
        <p class="block mt2">${demo.description}</p>
        <div class="callouts">
          ${$.map(demo.callouts, (calloutUrl, name) => `<a class="inline-block mt0" href="${calloutUrl}">${name}</a>`).join(' &bull; ').toString()}
        </div>
        <div class="card-footer mt2">
          ${demo.packages.map(name => `<a href="#${hash(name)}" class="pill bg-light-gray text-space-gray mt0 mb1">${name}</a>`).join(' ').toString()}
        </div>
      </div>
      `
    );
  });
}

function main () {
  const query = getQuery()
  const items = getItems(query)
  render(items)
}

window.onhashchange = function () {
  const query = getQuery()

  if (query) {
    clean()
    main()
  }
}

$(document).ready(main)
