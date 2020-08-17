const animationHtml = `
<div class="l-container">
  <div class="l-dot-container">
    <div class="l-dot"></div>
    <div class="l-dot"></div>
    <div class="l-dot"></div>
  </div>
  <div class="l-dot-container">
    <div class="l-dot"></div>
    <div class="l-dot"></div>
    <div class="l-dot"></div>  
  </div>
  <div class="l-dot-container">
    <div class="l-dot"></div>
    <div class="l-dot"></div>
    <div class="l-dot"></div>  
  </div>
</div>
`;

const getUrl = (endpoint, id) => {
  if (id) {
    return `https://ipa.dataocean.us/api/${endpoint}${id}/`;
  }
  return `https://ipa.dataocean.us/api/${endpoint}`;
};

const searchFormS = '#company-search-form';
const searchButtonS = '#company-search-btn';
const searchInputS = 'input#company-search';
const graphContainerS = '#graph';

const nodeTypes = {
  pep: {
    icon: 'pep/pep_active.svg',
    getValue: (obj) => obj.fullname,
    url: getUrl('pep/'),
  },
  company: {
    icon: 'build2.svg',
    getValue: (obj) => `${obj.edrpou} - ${obj.name}`,
    url: getUrl('company/'),
  },
};

const icons = {
  company: {
    active: 'static/icons/company/company_active.svg',
    inactive: 'static/icons/company/company_inactive.svg',
    root: 'static/icons/company/company_root.svg',
  },
  pep: {
    active: 'static/icons/pep/pep_active.svg',
    inactive: 'static/icons/pep/pep_inactive.svg',
  },
};
const width = 1000;
const height = 800;
const colors = {
  primary: '#3FA2F7',
  secondary: '#ADBCD9',
  root: '#4F4F4F',
};
const center = {
  x: width / 2,
  y: height / 3,
};
let nodes = [];
let links = [];
let selectedNode;

function parseNodesLinks(data, type) {
  let nodes = [];
  let links = [];

  function addChildNode(item, type) {
    item._opened = false;
    links.push({
      source: data.id,
      target: item.id,
      id: `${data.id}-${item.id}`,
    });
    nodes.push({
      ...item,
      _type: type,
      _opened: false,
      _root: false,
    });
  }

  function parseCompany() {
    nodes.push({
      ...data,
      _type: type,
      _opened: true,
      _root: true,
      related_peps: undefined,
      founder_of: undefined,
    });

    data.founder_of.forEach((item) => {
      addChildNode(item, 'company');
    });
    (data.related_peps || []).forEach((item) => {
      addChildNode(item, 'pep');
    });
  }

  function parsePep() {
    nodes.push({
      ...data,
      _type: type,
      _opened: true,
      _root: true,
      related_companies: undefined,
      related_persons: undefined,
    });
    data.related_companies.forEach((item) => {
      addChildNode(item.company, 'company');
    });
    data.related_persons.forEach((item) => {
      addChildNode(item, 'pep');
    });
  }

  type === 'company' ? parseCompany() : parsePep();

  return [nodes, links];
}


function pushIfNotExists(array, newItem) {
  const res = array.find(item => item.id === newItem.id);
  if (!res) {
    array.push(newItem);
    return true;
  }
  return false;
}

function showMessage(message) {
  $(graphContainerS).empty();
  $(graphContainerS).append(`
    <div class="loading-container">
      <h4 class="text-secondary">
        ${message}
      </h4>
    </div>
  `);
}

showMessage('Щоб розпочати роботу скористайтесь пошуком');

function showSearchResults(data, type) {
  const searchDropdown = $('.search-dropdown');
  const searchResults = searchDropdown.find('ul');
  searchResults.find('li.search-result').remove();

  $(document).one('click', function () {
    searchDropdown.removeClass('show');
  });

  const nodeType = nodeTypes[type];

  data.forEach((item) => {
    searchResults.append(`
      <li class="list-group-item p-1 list-group-item-action search-result"
          data-id="${item.id}"
          data-type="${type}"
      >
        <img class="pr-3 p-2" src="static/icons/${nodeType.icon}" alt="">
        <div class="search-result__text ${type === 'pep' ? 'text-capitalize' : ''}">
          ${nodeType.getValue(item)}
        </div>
      </li>
    `);
  });
  searchDropdown.addClass('show');
}

function startSearchLoading() {
  $(searchButtonS).prop('disabled', true);
  $(searchInputS).prop('disabled', true);
  $(searchButtonS).html(`
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `);
}

function endSearchLoading() {
  $(searchButtonS).prop('disabled', false);
  $(searchInputS).prop('disabled', false);
  $(searchButtonS).html('<img src="static/icons/search.svg" alt="Пошук">');
}

function startLoading() {
  $(graphContainerS).empty();
  $(searchButtonS).prop('disabled', true);
  $(graphContainerS).append(
    `<div class="loading-container">${animationHtml}</div>`
  );
}

function endLoading() {
  $(graphContainerS).empty();
  $(searchButtonS).prop('disabled', false);
}

$(searchFormS).on('submit', function (e) {
  e.preventDefault();
  startSearchLoading();
  const value = $(searchInputS).val();

  // let type = 'pep';
  // let data = { search: value };
  // if (/^\d{8}$/.test(value)) {
  //   type = 'company';
  //   data = { edrpou: value };
  // }
  let type = 'company';
  let data = { edrpou: value };

  $.ajax(nodeTypes[type].url, {
    data,
    success: (data) => {
      showSearchResults(data.results, type);
      endSearchLoading();
    },
    error: () => {
      endSearchLoading();
      showMessage('Сталась непередбачувана помилка');
    }
  });
});

$(document).on('click', '.search-result', function () {
  const type = $(this).data('type');
  const id = $(this).data('id');

  startLoading();
  $.ajax(`${nodeTypes[type].url}${id}/`, {
    success: (data) => {
      endLoading();
      [nodes, links] = parseNodesLinks(data, type);
      drawSimulation();
    },
    error: () => {
      endLoading();
      showMessage('Сталась непередбачувана помилка');
    }
  });
});

function drawSimulation() {
  let i = 0;

  // const transform = d3.zoomIdentity;

  let node, link;
  $('#graph').empty();
  const svg = d3.select(graphContainerS).append('svg')
    .attr('height', height)
    // .attr('width', width)
    // .attr('height', '100%')
    .attr('width', '100%')
    .attr('viewBox', '0 0 1000 600')
    // .style('border', '1px solid #666')
    // .style('border-radius', '10px')
    .call(d3.zoom()
      // .scaleExtent([1 / 2, 8])
      .on('zoom', zoomed)
    )
    .append('g');

  svg.append("defs").selectAll("marker")
    .data(["end-secondary", 'end-primary'])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "2 -5 9 10")
    .attr("refX", (d) => {
      if (d === 'end-secondary')
        return 42;
      if (d === 'end-primary')
        return 31;
    })
    .attr("refY", 0)
    .attr("markerWidth", (d) => {
      if (d === 'end-secondary')
        return 8;
      if (d === 'end-primary')
        return 12;
    })
    .attr("markerHeight", (d) => {
      if (d === 'end-secondary')
        return 8;
      if (d === 'end-primary')
        return 12;
    })
    .attr("markerUnits", 'userSpaceOnUse')
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L12,0L0,5")
    .attr('fill', (d) => {
      if (d === 'end-secondary')
        return colors.secondary;
      if (d === 'end-primary')
        return colors.primary;
    });

  const linksG = svg.append("g").attr("class", "links");
  const nodesG = svg.append("g").attr("class", "nodes");

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink()
      .id((d) => d.id)//.distance(150)
      .distance((d) => {
        if (!d.distance) {
          d.distance = Math.floor(Math.random() * (250 - 150)) + 150;
        }
        return d.distance;
      })
    )
    .force('charge', d3.forceManyBody().strength(-70))
    .force('center', d3.forceCenter(center.x, center.y))
    .force('collision', d3.forceCollide((d) => d._root ? 32 : 24))
    .alphaDecay(0.001)
    .on('tick', ticked);

  // const root = d3.hierarchy(data, );
  // let [nodes, links] = parseNodesLinks(data);

  function update(d = { id: null }) {
    // const nodes = flatten(root);
    // const links = root.links();
    link = linksG
      .selectAll('.link')
      .data(links, (d) => d.id);

    link.exit().remove();

    const linkEnter = link
      .enter()
      // .attr("class", "link")
      .append('line')
      // .attr("marker-end", "url(#end-secondary)")
      .attr("marker-end", (d_link) => {
        return d_link.source === d.id ? "url(#end-primary)" : "url(#end-secondary)";
      })
      .attr('class', 'link')
      // .style('stroke', colors.secondary)
      .style('opacity', 0)
      // .style('stroke-width', 1)
      .style('stroke', (d_link) => {
        return d_link.source === d.id ? colors.primary : colors.secondary;
      })
      .style('stroke-width', (d_link) => {
        return d_link.source === d.id ? 2 : 1;
      });
    // .on('mouseenter', lineHover)
    // .on('mouseleave', lineBlur);

    addTransition(linkEnter, 1000);

    link = linkEnter.merge(link);

    node = nodesG
      .selectAll('.node')
      .data(nodes, d => d.id);

    node.exit().remove();

    const nodeEnter = node
      .enter()
      .append('g')
      .attr('id', (d) => `company-${d.id}`)
      .attr('class', 'node')
      .style('opacity', 0)
      .style('stroke', nodeDefaultColor)
      .style('fill', nodeDefaultColor)
      .on('mouseenter', nodeHover)
      .on('mouseleave', nodeBlur)
      .on('click', nodeClick)
      .on('contextmenu', nodeRightClick)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    addTransition(nodeEnter);

    nodeEnter.append('circle')
      .attr("r", (d) => d._root ? 32 : 24)
      // .attr("r", 5)
      .style('cursor', 'pointer')
      // .style('stroke', )
      .style('stroke-width', 2)
      .style('fill', '#fff');
    // .on('click', nodeClick);

    nodeEnter.append('rect')
      // .attr('hidden', hideCount)
      .attr('x', -7)
      .attr('y', -32)
      .attr('width', 14)
      .attr('height', 14)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('class', 'child-count')
      .style('stroke-width', 0)
      // .style('fill', '#3FA2F7')
      .style('cursor', 'pointer');
    // .on('click', nodeClick);

    // nodeEnter.append('image')
    //   .attr('xlink:href', 'static/icons/build1.svg')
    //   .attr('x', -16)
    //   .attr('y', -18)

    let nodeIconGroup = nodeEnter.append('svg')
      .attr('x', (d) => d._root ? -22 : -16)
      .attr('y', (d) => d._root ? -24 : -18)
      .style('cursor', 'pointer')
      // .on('click', nodeClick)
      .append('g')
      // .attr('width', (d) => d._root ? 40 : 32)
      // .attr('heigth', (d) => d._root ? 40 : 32)
      // .attr('viewBox', '0 0 40 40')
      .attr('transform', (d) => d._root ? 'scale(1.4)' : null);

    nodeIconGroup.append('image')
      .attr('class', 'node-image')
      .attr('x', 0)
      .attr('y', 1)
      .attr('xlink:href', nodeDefaultImage);

    // nodeIconGroup.append('path')
    //   .attr('fill-rule', "evenodd")
    //   .attr('clip-rule', "evenodd")
    //   .attr('d', (d) => {
    //     // return 'M15.5 1H16.7V1.59998H20.9L19.7 3.09998L20.9 4.59998H16.7V6.16H15.5V4.59998V1.59998V1ZM3 ' +
    //     //   '14C4.3 10.134 11.4203 7 16 7C20.5797 7 27.7 10.134 29 14H3ZM7.5 16H3.5V28H7.5V16ZM9.5 ' +
    //     //   '16H12.5V24H9.5V16ZM24.5 16H28.5V28H24.5V16ZM14.5 24V16H17.5V24H14.5ZM22.5 ' +
    //     //   '16H19.5V24H22.5V16ZM9.5 28V26H22.5V28H9.5Z'
    //     return 'M20 3H12V5H8V7H6V29H13V24H19V29H26V7H24V5H20V3ZM15 ' +
    //       '9H10V12H15V9ZM10 14H15V17H10V14ZM15 19H10V22H15V19ZM22 ' +
    //       '9H17V12H22V9ZM17 14H22V17H17V14ZM22 19H17V22H22V19Z';
    //   })
    //   // .attr('fill', '#3FA2F7')
    //   .attr('stroke-width', 0);

    nodeIconGroup.append('image')
      .attr('x', -1)
      .attr('y', 18)
      .style('display', (d) => {
        return d.is_closed ? undefined : 'none';
      })
      .attr('xlink:href', 'static/icons/closed.svg');

    nodeEnter.append('text')
      // .attr('hidden', hideCount)
      // TODO: replace text hardcode
      .text((d) => d.founder_of_count || 0)
      .attr('class', 'child-count')
      .attr('x', 0)
      .attr('y', -22)
      .style('stroke-width', 0)
      .style('stroke', '#fff')
      .style('fill', '#fff')
      .style('text-anchor', 'middle')
      .style('font-size', 10)
      .style('cursor', 'pointer');
    // .on('click', nodeClick);

    // svg.selectAll('.child-count')
    //   .style('display', (d) => d.children && d.children.length ? "none" : undefined);

    node = nodeEnter.merge(node);
    simulation.nodes(nodes);
    simulation.force('link').links(links);

    d3.selectAll('svg .node').each(function (d, i) {
      $(this).popover({
        trigger: 'hover',
        title: d.name,
        placement: 'top',
        html: true,
        content: `<div class="company-name">${d.short_name || d.name}</div>` +
          `<div>${d.company_type || ''}</div>` +
          `<div><b>ЄДРПОУ:</b> ${d.edrpou || ''}</div>` +
          `<div><b>Статус:</b> ${d.status || ''}</div>`,
        template: '<div class="popover" role="tooltip">' +
          // '<div class="arrow"></div>' +
          // '<h3 class="popover-header"></h3>' +
          '<div class="popover-body popover-primary"></div>' +
          '</div>'
      });
    });
    svg.selectAll('.child-count')
      .attr('hidden', hideCount);
  }

  function addTransition(d, delay = 0) {
    d.transition()
      .delay(delay)
      .duration(1000)
      .ease(d3.easeLinear)
      .style("opacity", 1);
  }

  function hideCount(d) {
    return !d.founder_of_count || d._opened ? true : null;
  }

  function sizeContain(num) {
    num = num > 1000 ? num / 1000 : num / 100;
    if (num < 4) num = 4;
    return num;
  }

  function radius(d) {
    return d._children ? 8
      : d.children ? 8
        : 4;
  }

  function ticked() {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
    // .attr('x2', (d) => calculateX(d.target.x, d.target.y, d.source.x, d.source.y, 25))
    // .attr('y2', (d) => calculateY(d.target.x, d.target.y, d.source.x, d.source.y, 25));

    // link.attr("d", function (d) {
    //   let dx = d.target.x - d.source.x;
    //   let dy = d.target.y - d.source.y;
    //   let dr = Math.sqrt(dx * dx + dy * dy);
    //   return "M" +
    //     d.source.x + "," +
    //     d.source.y + "A" +
    //     dr + "," + dr + " 0 0,1 " +
    //     d.target.x + "," +
    //     d.target.y;
    // });

    node
      .attr('transform', (d) => {
        return `translate(${d.x}, ${d.y})`;
      });
  }

  function renderCompanyDetail(company) {
    const $detail = $('#detail-block');
    $detail.empty();

    const founders = company.founders.map((founder) => {
      if (founder.id_if_company) {
        const isNodeExists = nodes.find((node) => founder.id_if_company === node.id);
        const isLinkExists = isNodeExists && links.find((link) => (
          link.source.id === founder.id_if_company && link.target.id === company.id
        ));
        if (isLinkExists) {
          return `<li>${founder.name} ${founder.edrpou || ''}</li>`;
        }
        return (
          `<li>
            <a href="${getUrl('company/', founder.id_if_company)}" class="js-open-company">
              ${founder.name} ${founder.edrpou || ''}
            </a>
          </li>`
        );
      }
      return `<li class="text-capitalize">${founder.name}</li>`;
    });

    const founder_of = company.founder_of.map((comp) => {
      return `<li>${comp.name}</li>`;
    });

    const getHeadSigner = (company) => {
      const head = company.signers.find((person) => / - керівник$/.test(person));
      if (head) {
        return head.split(' - ')[0];
      } else {
        return 'невідомо';
      }
    };
    $detail.append(`
      <div class="detail__name">${company.name}</div>
      <div class="detail__prop">${company.short_name}</div>
      <div class="detail__prop">
        <span class="detail__prop-name">Статус:</span> ${company.status}
      </div>
      <div class="detail__prop">
        <span class="detail__prop-name">ЄДРПОУ:</span> ${company.edrpou}
      </div>
      <div class="detail__prop">
        <span class="detail__prop-name">Адреса:</span> ${company.address || ''}
      </div>
      <div class="detail__prop">
        <span class="detail__prop-name">Статутний капітал:</span> ${company.authorized_capital || 'невідомо'}
      </div>
      <div class="detail__prop">
        <span class="detail__prop-name">Керівник:</span> 
        <span class="text-capitalize">${getHeadSigner(company)}</span>
      </div>
      <div class="detail__prop-name">Засновники:</div>
      <div class="detail__prop">
        <ul style="padding-left: 20px">${founders.join('')}</ul>
      </div>
      <div class="detail__prop-name">Є засновником:</div>
      <div class="detail__prop">
        <ul style="padding-left: 20px">${founder_of.join('')}</ul>
      </div>
    `);
  }

  function renderPepDetail(pep) {
    const $detail = $('#detail-block');
    $detail.empty();
    $detail.append(`
      <div class="detail__name">${pep.fullname}</div>
    `);
  }

  function addNewCompanies(d, newNodes, isNewD) {
    increaseSimulationSpeed();
    newNodes.forEach((newNode) => {
      newNode._opened = false;
      newNode._type = 'company';
      const isNew = pushIfNotExists(nodes, newNode);
      if (isNew) {
        newNode.x = d.x;
        newNode.y = d.y;
        newNode._parent = d.id;
      }
      links.push({
        source: d.id,
        target: newNode.id,
        id: `${d.id}-${newNode.id}`,
        _parent: d.id,
      });
      d._opened = true;
    });

    svg.selectAll('.child-count')
      .attr('hidden', hideCount);
    update(d);
  }

  function nodeClick(d) {
    if (d3.event.defaultPrevented) {
      return;
    }
    selectedNode = d;
    svg.selectAll('.node')
      .style('stroke', nodeDefaultColor)
      .style('fill', nodeDefaultColor);

    d3.select(this.closest('g'))
      .style('fill', colors.primary)
      .style('stroke', colors.primary);

    svg.selectAll('image.node-image')
      .attr('xlink:href', nodeDefaultImage);

    d3.select(this.querySelector('image.node-image'))
      .attr('xlink:href', (d) => {
        return d._type === 'pep' ? icons.pep.active : icons.company.active;
      });

    // svg.selectAll('.link').exit().remove();
    svg.selectAll('.link')
      .attr("marker-end", (d_link) => {
        return d_link.source.id === d.id ? "url(#end-primary)" : "url(#end-secondary)";
      })
      .style('stroke', (d_link) => {
        return d_link.source.id === d.id ? colors.primary : colors.secondary;
      })
      .style('stroke-width', (d_link) => {
        return d_link.source.id === d.id ? 2 : 1;
      });
    const $detail = $('#detail-block');
    $detail.empty();
    $detail.append(
      `<div class="w-100 d-flex justify-content-center">${animationHtml}</div>`
    );

    $.ajax(`${nodeTypes[d._type].url}${d.id}/`, {
      success: (data) => {
        if (d.founder_of_count && !d._opened) {
          addNewCompanies(d, data.founder_of);
        }
        if (d._type === 'company') {
          renderCompanyDetail(data);
        } else {
          renderPepDetail(data);
        }
      }
    });

    // Object.entries(d).forEach(([key, value]) => {
    //   if (key === 'children') return;
    //   $data.append(
    //     `<tr><td>${key}</td><td>${value}</td></tr>`
    //   );
    // });
  }

  function nodeRightClick(d) {
    d3.event.preventDefault();
    if (d._root) return;

    function removeChildNodes(d_node) {
      const children = [];
      links = links.filter((link) => d_node.id !== link._parent);
      nodes = nodes.filter((node) => {
        if (d_node.id === node._parent) {
          children.push(node);
          return false;
        }
        return true;
      });
      children.forEach((node) => removeChildNodes(node));
    }

    removeChildNodes(d);

    d._opened = false;
    svg.selectAll('.child-count')
      .attr('hidden', hideCount);

    update(d);
  }

  function nodeDefaultColor(d) {
    return d._root ? colors.root : colors.secondary;
  }

  function nodeDefaultImage(d) {
    if (d._type === 'company') {
      return d._root ? icons.company.root : icons.company.inactive;
    } else {
      return icons.pep.inactive;
    }
  }

  function nodeHover(d) {
    if (!d3.event.defaultPrevented) {
      d3.select(this).select('circle')
        .style('fill', '#EBF6FE');
    }
  }

  function nodeBlur(d) {
    if (!d3.event.defaultPrevented) {
      d3.select(this).select('circle')
        .style('fill', '#fff');
    }
  }

  function lineHover(d) {
    if (!d3.event.defaultPrevented) {
      d3.select(this)
        .style('stroke-width', 2)
        .style('stroke', colors.primary);
    }
  }

  function lineBlur(d) {
    if (!d3.event.defaultPrevented) {
      d3.select(this)
        .style('stroke-width', 1)
        .style('stroke', colors.secondary);
    }
  }


  function increaseSimulationSpeed() {
    simulation.alpha(0.01);
    let a = 0.1;
    let int = setInterval(() => {
      if (a === 0.7) {
        clearInterval(int);
        return;
      }
      simulation.alpha(a);
      a += 0.1;
    }, 100);
  }


  function countClick(d) {
    if (!d3.event.defaultPrevented) {
      // if (d.children) {
      //   d._children = d.children;
      //   d.children = null;
      // } else {
      //   d.children = d._children;
      //   d._children = null;
      // }
      // let newNode = d3.hierarchy(additionalData1);
      // let newNodes = additionalData1.map((item) => {
      //   let newNode = d3.hierarchy(item);
      //   newNode.depth = d.depth + 1;
      //   newNode.height = d.height - 1;
      //   newNode.parent = d;
      //   newNode.x = d.x;
      //   newNode.y = d.y;
      //   return newNode;
      // });

      // let newNodes = additionalData1.map((newNode) => {
      //   newNode._opened = false;
      //   const isNew = pushIfNotExists(nodes, newNode);
      //   if (isNew) {
      //     newNode.x = d.x;
      //     newNode.y = d.y;
      //   }
      //   links.push({
      //     source: d.id,
      //     target: newNode.id,
      //     id: `${d.id}-${newNode.id}`
      //   });
      //   // node._opened = true;
      // });
      //
      // // d.children = newNodes;
      // // d.data.children = newNodes.data;
      // update(d);
    }
  }


  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function flatten(root) {
    const nodes = [];

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      else ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }

  function zoomed() {
    svg.attr('transform', d3.event.transform);
  }

  update();

  $(document).on('click', 'a.js-open-company', function (e) {
    e.preventDefault();
    $(this).closest('li').html($(this).text());
    $.ajax(this.href, {
      success: (data) => {
        const newNodes = data.founder_of;
        delete data.founder_of;
        data._opened = false;
        data._type = 'company';
        const isNew = pushIfNotExists(nodes, data);
        if (isNew) {
          data.x = selectedNode.x;
          data.y = selectedNode.y;
          data._parent = selectedNode.id;
        }
        links.push({
          source: data.id,
          target: selectedNode.id,
          id: `${data.id}-${selectedNode.id}`,
          _parent: data.id,
        });
        data._opened = true;

        addNewCompanies(data, newNodes);
        $(`#company-${data.id}`)[0].dispatchEvent(new MouseEvent('click'));
      },
      // error: () => {
      //   // endSearchLoading();
      //   // showMessage('Сталась непередбачувана помилка');
      // }
    });
  });
}
