import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import * as d3 from 'd3';
import $ from 'jquery';

let apiHost = '';
let ajaxHeaders = {};

$.ajax('static/meta.json', {
  async: false,
  cache: false,
  success: function (data) {
    apiHost = data.apiHost.replace(/\/$/, '');
    ajaxHeaders.Authorization = `Token ${data.t}`;
  },
});

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
    return `${apiHost}/api/${endpoint}${id}/`;
  }
  return `${apiHost}/api/${endpoint}`;
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const searchFormS = '#company-search-form';
const searchButtonS = '#company-search-btn';
const searchInputS = 'input#company-search';
const graphContainerS = '#graph';

const nodeTypes = {
  pep: {
    icon: 'pep/pep_active.svg',
    getSearchText: (obj) => obj.fullname,
    url: getUrl('pep/'),
  },
  company: {
    icon: 'build2.svg',
    getSearchText: (obj) => `${obj.edrpou} - ${obj.name}`,
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
  peoples: {
    active: 'static/icons/peoples/peoples_active.svg',
    inactive: 'static/icons/peoples/peoples_inactive.svg',
  },
  hearth: {
    active: 'static/icons/hearth/hearth_active.svg',
    inactive: 'static/icons/hearth/hearth_inactive.svg',
  },
  briefcase: {
    active: 'static/icons/briefcase/briefcase_active.svg',
    inactive: 'static/icons/briefcase/briefcase_inactive.svg',
  },
  beneficiary: {
    active: 'static/icons/beneficiary/beneficiary_active.svg',
    inactive: 'static/icons/beneficiary/beneficiary_inactive.svg',
  },
  top_manager: {
    active: 'static/icons/top_manager/top_manager_active.svg',
    inactive: 'static/icons/top_manager/top_manager_inactive.svg',
  },
};

const relatedPersonIcons = {
  family: {
    types: [
      'усиновлювач',
      'падчерка',
      'дід',
      'рідний брат',
      'мати',
      'син',
      'невістка',
      'внук',
      'мачуха',
      'особа, яка перебуває під опікою або піклуванням',
      'усиновлений',
      'внучка',
      'батько',
      'рідна сестра',
      'зять',
      'чоловік',
      'опікун чи піклувальник',
      'дочка',
      'свекор',
      'тесть',
      'теща',
      'баба',
      'пасинок',
      'вітчим',
      'дружина',
      'свекруха',
    ],
    icons: icons.hearth,
  },
  work: {
    types: [
      'ділові зв\'язки',
    ],
    icons: icons.briefcase,
  },
  personal: {
    types: [
      'особисті зв\'язки',
      'особи, які спільно проживають',
      'пов\'язані спільним побутом і мають взаємні права та обов\'язки',
    ],
    icons: icons.peoples,
  },
};

function getIconsForRelationType(relType) {
  for (let relations of Object.values(relatedPersonIcons)) {
    if (relations.types.find((relationType) => relType.includes(relationType))) {
      return relations.icons;
    }
  }
}

const width = 1900;
const height = 900;
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
let rootNodeId;

function parseNodesLinks(data, type) {
  let newRootNode;

  function addChildNode(item, type, isRelatedPerson = false) {
    const newNode = {
      ...item,
      _type: type,
      _opened: false,
      _root: false,
    };
    if (type === 'pep' && isRelatedPerson) {
      newNode._isRelatedPerson = true;
    }
    newNode.id = getIdForNode(newNode);
    tryPushChildNode(newRootNode, newNode);
    // if (newRootNode.id === newNode.id) {
    //   return;
    // }
    // links.push({
    //   source: newRootNode.id,
    //   target: newNode.id,
    //   id: `${newRootNode.id}-${newNode.id}`,
    // });
    // nodes.push(newNode);
  }

  function parseCompany() {
    newRootNode = {
      ...data,
      _type: type,
      _opened: true,
      _root: true,
      relationships_with_peps: undefined,
      founder_of: undefined,
      founders: undefined,
    };
    newRootNode.id = getIdForNode(newRootNode);
    nodes.push(newRootNode);

    data.founder_of.forEach((item) => {
      addChildNode(item, 'company');
    });
    data.relationships_with_peps.forEach((item) => {
      addChildNode(item.pep, 'pep');
    });
  }

  function parsePep() {
    newRootNode = {
      ...data,
      _type: type,
      _opened: true,
      _root: true,
      related_companies: undefined,
      related_persons: undefined,
      check_companies: undefined,
    };
    newRootNode.id = getIdForNode(newRootNode);
    nodes.push(newRootNode);
    data.related_companies.forEach((item) => {
      addChildNode(item.company, 'company');
    });
    data.related_persons.forEach((item) => {
      addChildNode(item, 'pep', true);
    });
    data.check_companies.forEach((item) => {
      addChildNode(item, 'company');
    });
  }

  type === 'company' ? parseCompany() : parsePep();
}

function waitElementAndClick(selector) {
  const interval = setInterval(() => {
    const element = $(selector);
    if (element.length) {
      clearInterval(interval);
      element[0].dispatchEvent(new MouseEvent('click'));
    }
  }, 100);
}

function pushIfNotExists(array, newItem) {
  const res = array.find(item => item.id === newItem.id);
  if (!res) {
    array.push(newItem);
    return true;
  }
  return false;
}

function tryPushChildNode(d, newNode, reverse_link = false) {
  if (d.id === newNode.id) {
    return;
  }
  const isNew = pushIfNotExists(nodes, newNode);
  if (isNew) {
    newNode.x = d.x;
    newNode.y = d.y;
    newNode._parent = d.id;
    newNode._opened = false;
  } else {
    const existingLink = links.find((link) => {
      const ids = [link.source.id, link.target.id];
      return ids.includes(d.id) && ids.includes(newNode.id);
    });
    if (existingLink) {
      return;
    }
  }
  const newLink = reverse_link ? {
    source: newNode.id,
    target: d.id,
    id: `${newNode.id}-${d.id}`,
    _parent: newNode.id,
  } : {
    source: d.id,
    target: newNode.id,
    id: `${d.id}-${newNode.id}`,
    _parent: d.id,
  };
  pushIfNotExists(links, newLink);
}

function slideIcon($iconEl) {
  if ($iconEl.hasClass('slide-up')) {
    $iconEl.removeClass('slide-up');
    $iconEl.addClass('slide-down');
  } else if ($iconEl.hasClass('slide-down')) {
    $iconEl.removeClass('slide-down');
    $iconEl.addClass('slide-up');
  }
}

$('.side-block-header').on('click', function () {
  const el = $(this);
  const detailBody = el.siblings('.side-block-body');
  slideIcon(el.find('.slide'));
  if (detailBody.length) {
    if (detailBody.hasClass('show')) {
      detailBody.removeClass('show');
      detailBody.slideUp();
    } else {
      detailBody.addClass('show');
      detailBody.slideDown();
    }
  }
});

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
          ${nodeType.getSearchText(item)}
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

  let type = 'pep';
  let data = { name_search: value };
  if (/^\d{8}$/.test(value)) {
    type = 'company';
    data = { edrpou: value };
  }
  // let type = 'company';
  // let data = { edrpou: value };

  $.ajax(nodeTypes[type].url, {
    headers: ajaxHeaders,
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
  rootNodeId = getIdForNode({ _type: type, id });
  startLoading();
  $.ajax(`${nodeTypes[type].url}${id}/`, {
    headers: ajaxHeaders,
    success: (data) => {
      endLoading();
      nodes = [];
      links = [];
      parseNodesLinks(data, type);
      drawSimulation();
      waitElementAndClick(`#${rootNodeId}`);
      $('#node-detail').removeClass('d-none');
    },
    error: () => {
      endLoading();
      showMessage('Сталась непередбачувана помилка');
    }
  });
});

function getIdForNode(d) {
  let prefix;
  if (d._type === 'company') {
    prefix = 'company-';
  } else if (d._type === 'pep') {
    prefix = d._isRelatedPerson ? 'rp-' : 'pep-';
  } else {
    throw new Error(`wrong type ${type}`);
  }
  return `${prefix}${d.id}`;
}

function getIdFromNode(d) {
  return d.id.match(/-(\d+)$/)[1];
}

function drawSimulation() {
  let i = 0;
  let node, link;

  $('#graph').empty();
  const svg = d3.select(graphContainerS).append('svg')
    .attr('height', '100%')
    .attr('width', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .call(d3.zoom()
      // .scaleExtent([1 / 2, 8])
      .on('zoom', zoomed)
    )
    .append('g');

  svg.append("defs").selectAll("marker")
    .data([
      { variant: 'secondary', root: false },
      { variant: 'primary', root: false },
      { variant: 'secondary', root: true },
      { variant: 'primary', root: true },
    ])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", (d) => `arrow-${d.variant}-${d.root ? 'r' : 's'}`)
    .attr("viewBox", "2 -5 9 10")
    .attr("refX", (d) => {
      if (d.variant === 'secondary') {
        if (d.root) {
          return 52;
        } else {
          return 42;
        }
      }
      if (d.variant === 'primary') {
        if (d.root) {
          return 38;
        } else {
          return 31;
        }
      }
    })
    .attr("refY", 0)
    .attr("markerWidth", (d) => {
      if (d.variant === 'secondary')
        return 8;
      if (d.variant === 'primary')
        return 12;
    })
    .attr("markerHeight", (d) => {
      if (d.variant === 'secondary')
        return 8;
      if (d.variant === 'primary')
        return 12;
    })
    .attr("markerUnits", 'userSpaceOnUse')
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L12,0L0,5")
    .attr('fill', (d) => {
      if (d.variant === 'secondary')
        return colors.secondary;
      if (d.variant === 'primary')
        return colors.primary;
    });

  const linksG = svg.append("g").attr("class", "links");
  const nodesG = svg.append("g").attr("class", "nodes");

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink()
      .id((d) => d.id)//.distance(150)
      .distance((d) => {
        if (!d.distance) {
          d.distance = randomInRange(250, 150);
        }
        return d.distance;
      })
    )
    .force('charge', d3.forceManyBody().strength(-70))
    .force('center', d3.forceCenter(center.x, center.y))
    .force('collision', d3.forceCollide((d) => d._root ? 32 : 24))
    // .alphaDecay(0.001)
    .alphaDecay(0.01)
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
      .append('line')
      .attr("marker-end", (d_link) => markerEnd(d_link, d))
      .attr('class', 'link')
      .style('opacity', 0)
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
      .attr('id', (d) => d.id)
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

    nodes.forEach((d) => {
      let count = 0;
      links.forEach((link) => {
        if ([link.source.id, link.target.id].includes(d.id)) {
          count += 1;
        }
      });
      d._linksCount = count;
    });

    d3.selectAll('svg .node').each(function (d, i) {
      let content;
      if (d._type === 'pep') {
        if (d._isRelatedPerson) {
          content = `<div class="company-name text-capitalize">${d.fullname}</div>` +
            `<div>${d.is_pep ? 'Є публічним діячем' : 'Не є публічним діячем'}</div>` +
            `<div><b>Тип звязку:</b> ${d.relationship_type || ' --- '}</div>`;
        } else {
          content = `<div class="company-name text-capitalize">${d.fullname}</div>` +
            `<div>${d.is_pep ? 'Є публічним діячем' : 'Не є публічним діячем'}</div>` +
            `<div><b>Тип:</b> ${d.pep_type || ' --- '}</div>` +
            `<div><b>Посада:</b> ${d.last_job_title || ' --- '}</div>`;
        }
      } else if (d._type === 'company') {
        content = `<div class="company-name">${d.short_name || d.name}</div>` +
          `<div>${d.company_type || ' --- '}</div>` +
          `<div><b>ЄДРПОУ:</b> ${d.edrpou || ' --- '}</div>` +
          `<div><b>Статус:</b> ${d.status || ' --- '}</div>`;
      }
      if (!(d.name || d.fullname)) {
        debugger;
      }
      $(this).popover({
        trigger: 'hover',
        title: d.name || d.fullname,
        placement: 'top',
        html: true,
        content: content,
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

  function markerEnd(link, selectedNode) {
    let arrowId;
    let srcId;
    let dstId;
    if (typeof link.source === 'string') {
      srcId = link.source;
      dstId = link.target;
    } else {
      srcId = link.source.id;
      dstId = link.target.id;
    }
    if (srcId === selectedNode.id) {
      arrowId = 'arrow-primary-';
    } else {
      arrowId = 'arrow-secondary-';
    }
    if (dstId === rootNodeId) {
      arrowId += 'r';
    } else {
      arrowId += 's';
    }
    return `url(#${arrowId})`;
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
        const founderNodeId = getIdForNode({ id: founder.id_if_company, _type: 'company' });
        const companyNodeId = getIdForNode({ id: company.id, _type: 'company' });
        const isNodeExists = nodes.find((node) => founderNodeId === node.id);
        const isLinkExists = isNodeExists && links.find((link) => (
          link.source.id === founderNodeId && link.target.id === companyNodeId
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
      if (founder.name.split(' ').length === 3) {
        return `<li class="text-capitalize">${founder.name}</li>`;
      }
      return `<li>${founder.name}</li>`;
    });

    const founder_of = company.founder_of.map((comp) => {
      return `<li>${comp.name}</li>`;
    });

    const getHeadSigner = (company) => {
      const head = company.signers.find((person) => / - керівник/.test(person));
      if (head) {
        return head.split(' - ')[0];
      } else {
        return 'невідомо';
      }
    };
    $detail.append(`
      <div class="node-name">${company.name}</div>
      <div class="detail__prop">${company.short_name}</div>
      <div class="detail__prop">
        <span class="prop-name">Статус:</span> ${company.status}
      </div>
      <div class="detail__prop">
        <span class="prop-name">ЄДРПОУ:</span> ${company.edrpou}
      </div>
      <div class="detail__prop">
        <span class="prop-name">Адреса:</span> ${company.address || ''}
      </div>
      <div class="detail__prop">
        <span class="prop-name">Статутний капітал:</span>
        ${company.authorized_capital ? company.authorized_capital.toLocaleString() : 'невідомо'}
      </div>
      <div class="detail__prop">
        <span class="prop-name">Керівник:</span> 
        <span class="text-capitalize">${getHeadSigner(company)}</span>
      </div>
      <div class="prop-name">Засновники:</div>
      <div class="detail__prop">
        <ul style="padding-left: 20px">${founders.join('')}</ul>
      </div>
      <div class="prop-name">Є засновником:</div>
      <div class="detail__prop">
        <ul style="padding-left: 20px">${founder_of.join('')}</ul>
      </div>
    `);
  }

  function renderPepDetail(pep) {
    const $detail = $('#detail-block');
    $detail.empty();
    if (pep._isRelatedPerson) {
      $detail.append(`
        <div class="node-name">${pep.fullname}</div>
        <div>${pep.is_pep ? 'Є публічним діячем' : 'Не є публічним діячем'}</div>
        <div class="detail__prop">
          <span class="prop-name">Тип звязку:</span> ${pep.relationship_type}
        </div>
      `);
    } else {
      let related_companies = pep.related_companies.map((rel_company) => {
        return `<li>
           <div><u>${rel_company.relationship_type}</u></div>
           <div>${rel_company.company.name} (${rel_company.company.edrpou})</div>
        </li>`;
      });
      let related_persons = pep.related_persons.map((rel_person) => {
        return `<li>
           <div><u>${rel_person.relationship_type}</u></div>
           <div class="text-capitalize">${rel_person.fullname}</div>
        </li>`;
      });
      let check_companies = pep.check_companies.map((company) => {
        return `<li>
           ${company.name} (${company.edrpou})
        </li>`;
      });
      $detail.append(`
        <div class="node-name">${pep.fullname}</div>
        <div>${pep.is_pep ? 'Є публічним діячем' : 'Не є публічним діячем'}</div>
        <div class="detail__prop">
          <span class="prop-name">Остання посада:</span> ${pep.last_job_title}
        </div>
        <div class="detail__prop">
          <span class="prop-name">Останнє місце роботи:</span> ${pep.last_employer}
        </div>
        <div class="detail__prop">
          <span class="prop-name">Тип:</span> ${pep.pep_type}
        </div>
        <div class="prop-name">Пов'язані компанії:</div>
        <div class="detail__prop">
          <ul style="padding-left: 20px">${related_companies.join('')}</ul>
        </div>
        <div class="prop-name">Пов'язані особи:</div>
        <div class="detail__prop">
          <ul style="padding-left: 20px">${related_persons.join('')}</ul>
        </div>
        <div class="prop-name">Можливі зв'язки з компаніями:</div>
        <div class="detail__prop">
          <ul style="padding-left: 20px">${check_companies.join('')}</ul>
        </div>
      `);
    }
  }

  function addNewChildNodes(d, objects, type, isRelatedPerson = false, obj_prop = null) {
    objects.forEach((obj) => {
      if (obj_prop) {
        obj = obj[obj_prop];
      }
      const newNode = {
        ...obj,
        _type: type,
      };
      if (type === 'pep' && isRelatedPerson) {
        newNode._isRelatedPerson = true;
      }
      newNode.id = getIdForNode(newNode);
      tryPushChildNode(d, newNode);
    });
  }

  function nodeClick(e, d) {
    // debugger;
    if (e.defaultPrevented) {
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
      .attr('xlink:href', (d_node) => {
        if (d_node === d) {
          if (d._type === 'pep') {
            if (d._isRelatedPerson) {
              const icons = getIconsForRelationType(d.relationship_type);
              if (icons) {
                return icons.active;
              }
            }
            return icons.pep.active;
          }
          return icons.company.active;
        }
        return nodeDefaultImage(d_node);
      });


    // svg.selectAll('.link').exit().remove();
    svg.selectAll('.link')
      .attr("marker-end", (d_link) => markerEnd(d_link, d))
      .style('stroke', (d_link) => {
        return d_link.source.id === d.id ? colors.primary : colors.secondary;
      })
      .style('stroke-width', (d_link) => {
        return d_link.source.id === d.id ? 2 : 1;
      });
    const $detail = $('#detail-block');
    $detail.empty();
    $detail.append(
      `<div class="side-block-l-container">${animationHtml}</div>`
    );
    if (d._type === 'pep' && d._isRelatedPerson) {
      renderPepDetail(d);
      return;
    }
    $.ajax(`${nodeTypes[d._type].url}${getIdFromNode(d)}/`, {
      headers: ajaxHeaders,
      success: (data) => {
        if (d._type === 'company') {
          if (!d._opened) {
            increaseSimulationSpeed();
            addNewChildNodes(d, data.founder_of, 'company');
            addNewChildNodes(d, data.relationships_with_peps, 'pep', false, 'pep');
          }
          renderCompanyDetail(data);
        } else if (d._type === 'pep') {
          if (!d._opened) {
            increaseSimulationSpeed();
            addNewChildNodes(d, data.related_persons, 'pep', true);
            addNewChildNodes(d, data.related_companies, 'company', false, 'company');
            addNewChildNodes(d, data.check_companies, 'company');
          }
          renderPepDetail(data);
        } else {
          throw new Error(`wrong type ${d._type}`);
        }
        d._opened = true;
        svg.selectAll('.child-count')
          .attr('hidden', hideCount);
        update(d);
      }
    });
  }

  function nodeRightClick(e, d) {
    e.preventDefault();
    if (d._root) return;

    const removeLinks = [];
    const removeNodes = [];

    function removeChildNodes(d_node) {
      links.forEach((link) => {
        if (d_node === link.source) {
          if (link.target._linksCount < 2) {
            removeChildNodes(link.target);
            removeNodes.push(link.target);
          }
          removeLinks.push(link);
          d_node._linksCount -= 1;
          if (d_node._linksCount < 1) {
            removeNodes.push(d_node);
          }
        }
      });
    }

    removeChildNodes(d);

    links = links.filter((link) => !removeLinks.includes(link));
    nodes = nodes.filter((node) => !removeNodes.includes(node));

    $('.popover').remove();

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
    }
    if (d._type === 'pep') {
      if (d._isRelatedPerson) {
        const icons = getIconsForRelationType(d.relationship_type);
        if (icons) {
          return icons.inactive;
        }
      }
      return icons.pep.inactive;
    }
  }

  function nodeHover(e, d) {
    if (!e.defaultPrevented) {
      d3.select(this).select('circle')
        .style('fill', '#EBF6FE');
    }
  }

  function nodeBlur(e, d) {
    if (!e.defaultPrevented) {
      d3.select(this).select('circle')
        .style('fill', '#fff');
    }
  }

  function lineHover(e, d) {
    if (!e.defaultPrevented) {
      d3.select(this)
        .style('stroke-width', 2)
        .style('stroke', colors.primary);
    }
  }

  function lineBlur(e, d) {
    if (!e.defaultPrevented) {
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

  function dragstarted(e, d) {
    if (!e.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(e, d) {
    d.fx = e.x;
    d.fy = e.y;
  }

  function dragended(e, d) {
    if (!e.active) simulation.alphaTarget(0);
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

  function zoomed(e) {
    svg.attr('transform', e.transform);
  }

  update();

  $(document).on('click', 'a.js-open-company', function (e) {
    e.preventDefault();
    $(this).closest('li').html($(this).text());
    $.ajax(this.href, {
      headers: ajaxHeaders,
      success: (data) => {
        increaseSimulationSpeed();
        const newNodes = data.founder_of;
        delete data.founder_of;
        data._opened = true;
        data._type = 'company';
        data.id = getIdForNode(data);
        if (selectedNode.id !== data.id) {
          const isNew = pushIfNotExists(nodes, data);
          if (isNew) {
            data.x = selectedNode.x;
            data.y = selectedNode.y;
            // data._parent = selectedNode.id;
          }
        }
        // tryPushChildNode(selectedNode, data);
        addNewChildNodes(data, newNodes, 'company');
        update(data);
        waitElementAndClick(`#${data.id}`);
      },
      // error: () => {
      //   // endSearchLoading();
      //   // showMessage('Сталась непередбачувана помилка');
      // }
    });
  });
}
