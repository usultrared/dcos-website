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
    $(".demos-cards").prepend(
      `
      <div class="card card-content col-4 left-align bg-white has-footer">
        <h4 class="mt3 mb1 bold">${demo.title}</h4>
        <a href="#${demo.dcos_version}" style="font-size: .95rem;" class="block text-space-gray border-box my0">DC/OS ${demo.dcos_version.toString()}</a>
        <p class="block mt2">${demo.description}</p>
        <div class="callouts">
          ${$.map(demo.callouts, (calloutUrl, name) => `<a class="inline-block mt0 bold" href="${calloutUrl}">${name}</a>`).join(' &bull; ').toString()}
        </div>
        <div class="card-footer mt2">
          ${demo.packages.map(name => `<span href="#${hash(name)}" class="pill bg-light-gray text-space-gray mt0 mb1">${name}</span>`).join(' ').toString()}
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

  // if(query) {
  //   $(".demos-cards").prepend(
  //     `
  //     <div class="flex flex-wrap justify-start items-center col-12 mb2">
  //       <h3 class="px1 col-8 border-box">Showing demos matching: ${query}</h3>
  //       <span class="px1 col-4 right-align border-box">
  //         <a href="${document.location.href.replace(location.hash , '' )}">Reset filter</a>
  //       </span>
  //     </div>
  //     `
  //   )
  // }
}

/*****************
  This is used to listen to when people filter tags
*****************/
// window.onhashchange = function () {
//   const query = getQuery()

//   if (query) {
//     clean()
//     main()
//   }
// }

$(document).ready(main)
