// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/popover';
import './styles.scss';
import * as d3 from 'd3';
import $ from 'jquery';
import Handlebars from 'handlebars';
import loadingElement from './components/loadingElement';
import getIcons from './components/icons';
import { randomInRange, waitElementAndClick, capitalizeAll } from './utils';
import closedCompanyIcon from './icons/data-ocean/closed.svg';
import graphHtml from './graph.html';
import companyDetailHtml from './company_detail.html';
import pepDetailHtml from './pep_detail.html';


const S = {
  schemeRoot: '.do-pep-company-scheme',
  searchForm: '.do-company-search-form',

  searchButton: '.do-company-search-btn',
  searchInput: 'input.do-company-search',
  graphContainer: '.do-graph-container',
  detailBlock: '.do-node-detail',
  detailBlockBody: '.do-node-detail-body',
  filtersBlock: '.do-filters',
  legendBlock: '.do-legend-block',
  slideIcon: '.slide-icon',

  searchResult: '.do-search-result',

  openCompany: 'a.js-open-company',
};

const linkTypes = {
  owner: 'owner',
  beneficiary: 'beneficiary',
  head: 'head',
  family: 'family',
  business: 'business',
  personal: 'personal',
  other: 'other',
  inactive: 'inactive',
};

const filters = [
  { name: 'family', label: 'Родинні зв\'язки' },
  { name: 'personal', label: 'Особисті зв\'язки' },
  { name: 'business', label: 'Ділові зв\'язки' },
  { name: 'head', label: 'Керівник' },
  { name: 'beneficiary', label: 'Бенефіціар' },
  { name: 'owner', label: 'Власник' },
  { name: 'pep', label: 'Публічні особи' },
  { name: 'person', label: 'Фізичні особи' },
];

const PEP = 'pep';
const COMPANY = 'company';

const themes = {
  DATA_OCEAN: 'data-ocean',
  ANT_AC: 'antac',
};

class PepCompanyScheme {
  constructor(options = {}) {
    if (!options.rootElement) {
      throw new Error('Missed rootElement option');
    }
    this.useConfigFile = options.useConfigFile || false;
    this.rootElement = options.rootElement;
    this.theme = options.theme || 'data-ocean';
    this.icons = getIcons(options.icons, this.theme);
    this.showSearch = options.showSearch || false;
    this.apiHost = options.apiHost || '';
    this.token = options.token || '';
    this.tokenKeyword = options.tokenKeyword || 'PEP';
    this.ajaxHeaders = options.ajaxHeaders || {};
    this.configFileUrl = options.configFileUrl || 'static/config.json';
    if (this.token) {
      // this.ajaxHeaders['X-PEPToken'] = this.token
      this.ajaxHeaders.Authorization = `${this.tokenKeyword} ${this.token}`;
    }
    this.startNode = options.startNode || null;

    this.width = options.width || 1900;
    this.height = options.height || 900;

    this.colors = {
      primary: this.theme === themes.DATA_OCEAN ? '#3FA2F7' : '#4EAD33',
      secondary: this.theme === themes.DATA_OCEAN ? '#ADBCD9' : '#B2B9B0',
      root: '#4F4F4F',
      nodeHover: this.theme === themes.DATA_OCEAN ? '#EBF6FE' : '#EDF9E9',
      ...options.colors,
    };

    this.linkColors = {
      [linkTypes.business]: '#F39200',
      [linkTypes.family]: '#FF47DD',
      [linkTypes.personal]: '#FF006B',
      [linkTypes.head]: '#1F4999',
      [linkTypes.beneficiary]: '#852500',
      [linkTypes.owner]: '#03A7EA',
      [linkTypes.other]: '#B6B6B6',
      [linkTypes.inactive]: '#B6B6B6',
      ...options.linkColors,
    };

    this.linkLabels = {
      [linkTypes.owner]: 'Власник',
      [linkTypes.beneficiary]: 'Бенефіціар',
      [linkTypes.head]: 'Керівник',
      [linkTypes.business]: 'Ділові зв\'язки',
      [linkTypes.family]: 'Родинні зв\'язки',
      [linkTypes.personal]: 'Особисті зв\'язки',
      [linkTypes.other]: 'Інше',
      ...options.linkLabels,
    };

    this.center = {
      x: this.width / 2,
      y: this.height / 3,
    };

    this.nodes = [];
    this.links = [];
    this.selectedNode = null;
    this.rootNodeId = null;
    this.scheme = {
      svg: null,
      node: null,
      link: null,
      simulation: null,
    };
    this.linkTypeByRelationship = new Map([
      // owner
      ['owner', linkTypes.owner],
      ['власник', linkTypes.owner],
      ['власність', linkTypes.owner],
      ['співвласник', linkTypes.owner],
      ['спільна власність', linkTypes.owner],
      ['спільна сумісна власність', linkTypes.owner],
      // beneficiary
      ['бенефіціарний власник', linkTypes.beneficiary],
      // head
      ['керівник', linkTypes.head],
      ['директор', linkTypes.head],
      // business
      ['ділові зв\'язки', linkTypes.business],
      // personal
      ['особисті зв\'язки', linkTypes.personal],
      ['особи, які спільно проживають', linkTypes.personal],
      ['пов\'язані спільним побутом і мають взаємні права та обов\'язки', linkTypes.personal],
      // family
      ['усиновлювач', linkTypes.family],
      ['падчерка', linkTypes.family],
      ['дід', linkTypes.family],
      ['рідний брат', linkTypes.family],
      ['мати', linkTypes.family],
      ['син', linkTypes.family],
      ['невістка', linkTypes.family],
      ['внук', linkTypes.family],
      ['мачуха', linkTypes.family],
      ['особа, яка перебуває під опікою або піклуванням', linkTypes.family],
      ['усиновлений', linkTypes.family],
      ['внучка', linkTypes.family],
      ['батько', linkTypes.family],
      ['рідна сестра', linkTypes.family],
      ['зять', linkTypes.family],
      ['чоловік', linkTypes.family],
      ['опікун чи піклувальник', linkTypes.family],
      ['дочка', linkTypes.family],
      ['свекор', linkTypes.family],
      ['тесть', linkTypes.family],
      ['теща', linkTypes.family],
      ['баба', linkTypes.family],
      ['пасинок', linkTypes.family],
      ['вітчим', linkTypes.family],
      ['дружина', linkTypes.family],
      ['свекруха', linkTypes.family],
    ]);
    this.companyDetailTemplate = null;
  }

  init() {
    this.registerHandlebarsHelpers();
    if (this.useConfigFile) {
      this.fetchMeta();
    }
    this.injectHtml();
    this.showMessage('Щоб розпочати роботу скористайтесь пошуком');
    this.registerEventListeners();
    this.startResizeTick();
    // this.handleResizeRootElement();
    this.checkStartNode();
  }

  select(selector) {
    return $(this.rootElement).find(selector);
  }

  registerHandlebarsHelpers() {
    Handlebars.registerHelper('not', function (value) {
      return !value;
    });
    Handlebars.registerHelper('default', function (value, arg1, arg2) {
      if (value) {
        return value;
      }
      if (arg2) {
        return arg1;
      }
      return '---';
    });
    Handlebars.registerHelper('default_if_null', function (value, arg1, arg2) {
      if (value !== null && value !== undefined) {
        return value;
      }
      if (arg2) {
        return arg1;
      }
      return '---';
    });
    Handlebars.registerHelper('locale_string', function (value) {
      return value.toLocaleString();
    });

    this.companyDetailTemplate = Handlebars.compile(companyDetailHtml);
    this.pepDetailTemplate = Handlebars.compile(pepDetailHtml);

    this.prevRootHeight = null;
  }

  injectHtml() {
    const template = Handlebars.compile(graphHtml);
    const legendNodes = [
      { icon: this.icons.company.active, label: 'Юридична особа' },
      { icon: this.icons.pep.active, label: 'Публічний діяч' },
      { icon: this.icons.peoples.active, label: 'Фізична особа' },
    ];
    const legendLinks = [];
    Object.values(linkTypes).forEach((linkType) => {
      if (linkType in this.linkLabels) {
        legendLinks.push({ color: this.linkColors[linkType], label: this.linkLabels[linkType] });
      }
    });
    this.rootElement.innerHTML = template({
      showSearch: this.showSearch,
      icons: this.icons,
      themeDO: this.theme === themes.DATA_OCEAN,
      themeAA: this.theme === themes.ANT_AC,
      filters,
      legendNodes,
      legendLinks,
    });
    this.select(S.slideIcon).html(this.icons.other.slideUp);
  }

  startResizeTick() {
    setInterval(() => {
      this.handleResizeRootElement();
    }, 300);
  }

  handleResizeRootElement() {
    let rootHeight = this.rootElement.clientHeight;
    if (rootHeight !== this.prevRootHeight) {
      this.prevRootHeight = rootHeight;
      let detailsMaxHeight;
      if (this.showSearch) {
        detailsMaxHeight = `${rootHeight - 200}px`;
      } else {
        detailsMaxHeight = `${rootHeight - 113}px`;
      }
      this.select(`${S.detailBlock} .side-block-body`).css('max-height', detailsMaxHeight);
      // this.select(`${legendBlockS} .side-block-body`).css('max-height', `${rootHeight - 390}px`);
      this.select(`${S.legendBlock} .side-block-body`).css('max-height', `${rootHeight - 110}px`);
    }
  }

  checkStartNode() {
    if (this.startNode) {
      const id = this.startNode.id;
      const type = this.startNode.type;
      const isIdFromAntac = this.startNode.isIdFromAntac || false;
      if (!id) {
        throw new Error(`startNode.id prop not correct {id: ${id}`);
      }
      if (!type) {
        throw new Error(`startNode.type prop not correct {type: ${type}`);
      }
      if (typeof isIdFromAntac !== 'boolean') {
        throw new Error(`type of startNode.isIdFromAntac must be boolean`);
      }
      this.loadNodeById(id, type, isIdFromAntac);
    }
  }

  fetchMeta() {
    $.ajax(this.configFileUrl, {
      async: false,
      cache: false,
      success: (data) => {
        this.apiHost = data.apiHost.replace(/\/$/, '');
        this.token = data.token;
        this.ajaxHeaders.Authorization = `${this.tokenKeyword} ${data.token}`;
      },
    });
  }

  getUrl(endpoint, id = null) {
    if (id) {
      return `${this.apiHost}/api/${endpoint}${id}/`;
    }
    return `${this.apiHost}/api/${endpoint}`;
  };

  getUrlForType(type, id, isIdFromAntac = false) {
    if (type === PEP) {
      if (isIdFromAntac) {
        return this.getUrl(`pep/${id}/source-id/`);
      }
      return this.getUrl('pep/', id);
    } else if (type === COMPANY) {
      return this.getUrl('company/', id);
    } else {
      throw new Error(`wrong type - ${type}`);
    }
  }

  getIconForSearchResult(data, type) {
    if (type === PEP) {
      if (data.is_pep) {
        return this.icons.pep.active;
      }
      return this.icons.peoples.active;
    } else if (type === COMPANY) {
      return this.icons.company.active;
    } else {
      throw new Error(`wrong type - ${type}`);
    }
  }

  entityToString(type, obj) {
    if (type === PEP) {
      return obj.fullname;
    } else if (type === COMPANY) {
      return `${obj.edrpou} - ${obj.name}`;
    } else {
      throw new Error(`wrong type - ${type}`);
    }
  }

  extractObjAndLinkData(linkDataWithObj, objField, linkTypeField) {
    const obj = { ...linkDataWithObj[objField] };
    const linkData = {
      ...linkDataWithObj,
      _type: linkDataWithObj[linkTypeField],
      [objField]: undefined,
    };
    return [obj, linkData];
  }

  parseNodesLinks(data, type) {
    let newRootNode;

    const addChildNode = (item, type, reverseLink = false, linkData = {}) => {
      const newNode = {
        ...item,
        _type: type,
        _opened: false,
        _root: false,
      };
      newNode.id = this.getIdForNode(newNode);
      this.tryPushChildNode(newRootNode, newNode, reverseLink, linkData);
    };

    const parseCompany = () => {
      newRootNode = {
        ...data,
        _type: type,
        _opened: true,
        _root: true,
        relationships_with_peps: undefined,
        founder_of: undefined,
        founders: undefined,
      };
      newRootNode.id = this.getIdForNode(newRootNode);
      this.nodes.push(newRootNode);

      data.founder_of.forEach((company) => {
        addChildNode(company, COMPANY, false, { _type: linkTypes.owner });
      });
      data.relationships_with_peps.forEach((linkWithPep) => {
        const [pep, linkData] = this.extractObjAndLinkData(linkWithPep, 'pep', 'relationship_type');
        addChildNode(pep, PEP, true, linkData);
      });
    };

    const parsePep = () => {
      newRootNode = {
        ...data,
        _type: type,
        _opened: true,
        _root: true,
        related_companies: undefined,
        from_person_links: undefined,
        to_person_links: undefined,
        check_companies: undefined,
      };
      newRootNode.id = this.getIdForNode(newRootNode);
      this.nodes.push(newRootNode);
      data.related_companies.forEach((linkWithCompany) => {
        const [company, linkData] = this.extractObjAndLinkData(linkWithCompany, 'company', 'relationship_type');
        addChildNode(company, COMPANY, false, linkData);
      });
      data.from_person_links.forEach((linkWithPerson) => {
        const [pep, linkData] = this.extractObjAndLinkData(linkWithPerson, 'to_person', 'to_person_relationship_type');
        addChildNode(pep, PEP, false, linkData);
      });
      data.to_person_links.forEach((linkWithPerson) => {
        const [pep, linkData] = this.extractObjAndLinkData(linkWithPerson, 'from_person',
          'from_person_relationship_type');
        addChildNode(pep, PEP, true, linkData);
      });
      data.check_companies.forEach((item) => {
        addChildNode(item, COMPANY, false, { _type: linkTypes.owner, probable: true });
      });
    };
    type === COMPANY ? parseCompany() : parsePep();
  }

  pushIfNotExists(array, newItem) {
    const res = array.find(item => item.id === newItem.id);
    if (!res) {
      array.push(newItem);
      return true;
    }
    return false;
  }

  tryPushChildNode(d, newNode, reverseLink = false, linkData = {}) {
    if (d.id === newNode.id) {
      return;
    }
    const isNew = this.pushIfNotExists(this.nodes, newNode);
    if (isNew) {
      newNode.x = d.x;
      newNode.y = d.y;
      newNode._parent = d.id;
      newNode._opened = false;
    } else {
      const existingLink = this.links.find((link) => {
        const ids = [link.source.id, link.target.id];
        return ids.includes(d.id) && ids.includes(newNode.id);
      });
      if (existingLink) {
        return;
      }
    }
    const newLink = reverseLink ? {
      ...linkData,
      source: newNode.id,
      target: d.id,
      id: `${newNode.id}-${d.id}`,
      _parent: newNode.id,
    } : {
      ...linkData,
      source: d.id,
      target: newNode.id,
      id: `${d.id}-${newNode.id}`,
      _parent: d.id,
    };
    this.pushIfNotExists(this.links, newLink);
  }

  showMessage(message) {
    this.select(S.graphContainer).empty();
    this.select(S.graphContainer).append(`
    <div class="loading-container">
      <h4 class="text-secondary">
        ${message}
      </h4>
    </div>
  `);
  }

  handleSideBlockHeaderClick(e) {
    const el = this.select(e.currentTarget);
    const detailBody = el.siblings('.side-block-body');
    el.find(S.slideIcon).toggleClass('rotate-180');
    if (detailBody.length) {
      if (detailBody.hasClass('show')) {
        detailBody.removeClass('show');
        detailBody.slideUp();
      } else {
        detailBody.addClass('show');
        detailBody.slideDown();
      }
    }
  }

  registerEventListeners() {
    this.select('.side-block-header').on('click', (e) => {
      this.handleSideBlockHeaderClick(e);
    });
    this.select(S.searchForm).on('submit', (e) => {
      this.handleSearchFormSubmit(e);
    });
    $(document).on('click', S.searchResult, (e) => {
      this.handleSearchResultClick(e);
    });
    $(document).on('click', S.openCompany, (e) => {
      this.handleOpenCompany(e);
    });
  }

  showSearchResults(data, type) {
    const searchDropdown = this.select('.do-search-dropdown');
    const searchResults = searchDropdown.find('ul');
    searchResults.find('li').remove();

    $(document).one('click', () => {
      searchDropdown.removeClass('show');
    });

    if (!data.length) {
      searchResults.append(`
        <li class="list-group-item p-1 list-group-item-action">
          <div class="d-flex" style="justify-content: center">
            Немає результатів
          </div>
        </li>
      `);
    } else {
      data.forEach((item) => {
        searchResults.append(`
        <li class="list-group-item p-1 list-group-item-action do-search-result"
            data-id="${item.id}"
            data-type="${type}"
        >
          <div class="pr-3 p-2">
            ${this.getIconForSearchResult(data, type)}
          </div>
          <div class="do-search-result-text ${type === PEP ? 'text-capitalize' : ''}">
            ${this.entityToString(type, item)}
          </div>
        </li>
      `);
      });
    }
    searchDropdown.addClass('show');
  }

  startSearchLoading() {
    this.select(S.searchButton).prop('disabled', true);
    this.select(S.searchInput).prop('disabled', true);
    this.select(S.searchButton).html(`
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `);
  }

  endSearchLoading() {
    this.select(S.searchButton).prop('disabled', false);
    this.select(S.searchInput).prop('disabled', false);
    this.select(S.searchButton).html(this.icons.other.search);
  }

  startLoading() {
    this.select(S.graphContainer).empty();
    this.select(S.searchButton).prop('disabled', true);
    this.select(S.graphContainer).append(
      `<div class="loading-container">${loadingElement}</div>`
    );
  }

  endLoading() {
    this.select(S.graphContainer).empty();
    this.select(S.searchButton).prop('disabled', false);
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();
    this.startSearchLoading();
    const value = this.select(S.searchInput).val();

    let type = PEP;
    let data = { name_search: value, fields: 'id,fullname,is_pep' };
    if (/^\d{8}$/.test(value)) {
      type = COMPANY;
      data = { edrpou: value, fields: 'id,name,edrpou' };
    }

    data.page_size = 100;

    $.ajax(this.getUrlForType(type), {
      headers: this.ajaxHeaders,
      data,
      success: (data) => {
        this.showSearchResults(data.results, type);
        this.endSearchLoading();
      },
      error: () => {
        this.endSearchLoading();
        this.showMessage('Сталась непередбачувана помилка');
      }
    });
  }

  loadNodeById(id, type, isIdFromAntac = false) {
    if (![PEP, COMPANY].includes(type)) {
      throw new Error(`Bad type - ${type}`);
    }
    this.startLoading();
    $.ajax(this.getUrlForType(type, id, isIdFromAntac), {
      headers: this.ajaxHeaders,
      success: (data) => {
        this.rootNodeId = this.getIdForNode({ _type: type, id: data.id });
        this.endLoading();
        this.nodes = [];
        this.links = [];
        this.parseNodesLinks(data, type);
        this.drawSimulation();
        waitElementAndClick(`#${this.rootNodeId}`);
        this.select(S.detailBlock).show();
      },
      error: (xhr) => {
        this.endLoading();
        if (xhr.status === 404) {
          this.showMessage('Об\'єкт не знайдено');
        } else {
          this.showMessage('Сталась непередбачувана помилка');
        }
      }
    });
  }

  handleSearchResultClick(e) {
    const type = this.select(e.currentTarget).data('type');
    const id = this.select(e.currentTarget).data('id');
    this.loadNodeById(id, type);
  }

  getIdForNode(d) {
    let prefix;
    if (d._type === COMPANY) {
      prefix = 'company-';
    } else if (d._type === PEP) {
      prefix = 'pep-';
    } else {
      throw new Error(`wrong type ${d._type}`);
    }
    return `${prefix}${d.id}`;
  }

  getIdFromNode(d) {
    return d.id.match(/-(\d+)$/)[1];
  }

  generateDataForArrows() {
    let arrowsData = [];
    Object.entries(this.linkColors).forEach(([name, value]) => {
      arrowsData.push({ variant: name, color: value, root: true });
      arrowsData.push({ variant: name, color: value, root: false });
    });
    return arrowsData;
  }

  drawSimulation() {
    let i = 0;
    this.scheme.node = null;
    this.scheme.link = null;

    this.select(S.graphContainer).empty();
    this.scheme.svg = d3.select(S.graphContainer).append('svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .call(d3.zoom()
        // .scaleExtent([1 / 2, 8])
        .on('zoom', (e, d) => this.zoomed(e, d))
      )
      .append('g');


    this.scheme.svg.append("defs").selectAll("marker")
      .data(this.generateDataForArrows())      // Different link/path types can be defined here
      .enter()
      .append("svg:marker")    // This section adds in the arrows
      .attr("id", (d) => `arrow-${d.variant}-${d.root ? 'r' : 's'}`)
      .attr("viewBox", "2 -5 9 10")
      .attr("refX", (d) => {
        if (d.variant === 'inactive') {
          return d.root ? 52 : 42;
        }
        return d.root ? 38 : 31;
      })
      .attr("refY", 0)
      .attr("markerWidth", (d) => d.variant === 'inactive' ? 8 : 12)
      .attr("markerHeight", (d) => d.variant === 'inactive' ? 8 : 12)
      .attr("markerUnits", 'userSpaceOnUse')
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L12,0L0,5")
      .attr('fill', (d) => d.color);

    this.scheme.linksG = this.scheme.svg.append("g").attr("class", "links");
    this.scheme.nodesG = this.scheme.svg.append("g").attr("class", "nodes");

    this.scheme.simulation = d3.forceSimulation()
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
      .force('center', d3.forceCenter(this.center.x, this.center.y))
      .force('collision', d3.forceCollide((d) => d._root ? 32 : 24))
      // .alphaDecay(0.001)
      .alphaDecay(0.01)
      .on('tick', (e, d) => this.ticked(e, d));

    this.update();
  }

  addTransition(d, delay = 0) {
    d.transition()
      .delay(delay)
      .duration(1000)
      .ease(d3.easeLinear)
      .style("opacity", 1);
  }

  hideCount(d) {
    return !d.founder_of_count || d._opened ? true : null;
  }

  getLinkTypeForLink(d) {
    if (this.linkTypeByRelationship.has(d._type)) {
      return this.linkTypeByRelationship.get(d._type);
    }
    return linkTypes.other;
  }

  markerEnd(link, selectedNode) {
    let arrowId;
    let srcId = link.source.id || link.source;
    let dstId = link.target.id || link.target;
    if ([dstId, srcId].includes(selectedNode.id)) {
      arrowId = `arrow-${this.getLinkTypeForLink(link)}-`;
    } else {
      arrowId = 'arrow-inactive-';
    }
    if (dstId === this.rootNodeId) {
      arrowId += 'r';
    } else {
      arrowId += 's';
    }
    return `url(#${arrowId})`;
  }

  ticked(e, d) {
    this.scheme.link
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

    this.scheme.node
      .attr('transform', (d) => {
        return `translate(${d.x}, ${d.y})`;
      });
  }

  renderCompanyDetail(company) {
    const $detail = this.select(S.detailBlockBody);
    $detail.empty();

    const founders = company.founders.map((founder) => {
      if (founder.id_if_company) {
        const founderNodeId = this.getIdForNode({ id: founder.id_if_company, _type: COMPANY });
        const companyNodeId = this.getIdForNode({ id: company.id, _type: COMPANY });
        if (founderNodeId === companyNodeId) {
          return founder;
        }
        const isNodeExists = this.nodes.find((node) => founderNodeId === node.id);
        const isLinkExists = isNodeExists && this.links.find((link) => (
          link.source.id === founderNodeId && link.target.id === companyNodeId
        ));
        if (!isLinkExists) {
          founder.link = this.getUrl('company/', founder.id_if_company);
        }
        return founder;
      }
      if (founder.name.split(' ').length === 3) {
        founder.name = capitalizeAll(founder.name);
      }
      return founder;
    });

    const getHeadSigner = (company) => {
      const head = company.signers.find((person) => / - керівник/.test(person));
      if (head) {
        return head.split(' - ')[0];
      }
    };

    company.head = getHeadSigner(company);

    let html = this.companyDetailTemplate({ company, founders });

    $detail.append(html);
  }

  renderPepDetail(pep) {
    const $detail = this.select(S.detailBlockBody);
    $detail.empty();

    let related_persons = [...pep.from_person_links, ...pep.to_person_links].map((relation) => {
      const rel_person = relation.to_person || relation.from_person;
      const relationship_type = relation.to_person_relationship_type || relation.from_person_relationship_type;
      relation.person = rel_person;
      relation.relationship_type = relationship_type;
      return relation;
    });

    let html = this.pepDetailTemplate({ pep, related_persons });

    $detail.append(html);
  }

  nodeClick(e, d) {
    if (e.defaultPrevented) {
      return;
    }
    this.selectedNode = d;
    this.scheme.svg.selectAll('.node')
      .style('stroke', (d) => this.nodeDefaultColor(d))
      .style('fill', (d) => this.nodeDefaultColor(d));

    d3.select(e.currentTarget.closest('g'))
      .style('fill', this.colors.primary)
      .style('stroke', this.colors.primary);

    this.scheme.svg.selectAll('.node-image')
      .html((d_node) => {
        if (d_node === d) {
          if (d._type === PEP) {
            if (d.is_pep) {
              return this.icons.pep.active;
            }
            return this.icons.peoples.active;
          }
          return this.icons.company.active;
        }
        return this.nodeDefaultImage(d_node);
      });

    // svg.selectAll('.link').exit().remove();
    this.scheme.svg.selectAll('.link')
      .attr("marker-end", (d_link) => this.markerEnd(d_link, d))
      .style('stroke', (d_link) => this.linkColor(d_link, d))
      .style('stroke-width', (d_link) => this.linkWidth(d_link, d))
      .style('stroke-dasharray', (d_link) => this.linkDasharray(d_link, d));
    const $detail = this.select(S.detailBlockBody);
    $detail.empty();
    $detail.append(
      `<div class="side-block-l-container">${loadingElement}</div>`
    );
    $.ajax(this.getUrlForType(d._type, this.getIdFromNode(d)), {
      headers: this.ajaxHeaders,
      success: (data) => {
        if (d._type === COMPANY) {
          // if (!d._opened) {
          this.increaseSimulationSpeed();
          this.addNewChildNodes(d, data.founder_of, COMPANY, (company) => {
            return [company, { _type: linkTypes.owner }];
          }, false);
          this.addNewChildNodes(d, data.relationships_with_peps, PEP, (linkWithPep) => {
            return this.extractObjAndLinkData(linkWithPep, 'pep', 'relationship_type');
          }, true);
          // }
          this.renderCompanyDetail(data);
        } else if (d._type === PEP) {
          // if (!d._opened) {
          this.increaseSimulationSpeed();
          this.addNewChildNodes(d, data.from_person_links, PEP, (linkWithPep) => {
            return this.extractObjAndLinkData(linkWithPep, 'to_person', 'to_person_relationship_type');
          }, false);
          this.addNewChildNodes(d, data.to_person_links, PEP, (linkWithPep) => {
            return this.extractObjAndLinkData(linkWithPep, 'from_person', 'from_person_relationship_type');
          }, true);
          this.addNewChildNodes(d, data.related_companies, COMPANY, (linkWithCompany) => {
            return this.extractObjAndLinkData(linkWithCompany, 'company', 'relationship_type');
          }, false);
          this.addNewChildNodes(d, data.check_companies, COMPANY, (company) => {
            return [company, { _type: linkTypes.owner, probable: true }];
          }, false);
          // }
          this.renderPepDetail(data);
        } else {
          throw new Error(`wrong type ${d._type}`);
        }
        d._opened = true;
        this.scheme.svg.selectAll('.child-count')
          .attr('hidden', this.hideCount);
        this.handleResizeRootElement();
        this.update(d);
      }
    });
  }

  addNewChildNodes(d, items, type, getObjAndLink, reverseLink = false) {
    items.forEach((item) => {
      const [object, linkData] = getObjAndLink(item);
      const newNode = {
        ...object,
        _type: type,
      };
      newNode.id = this.getIdForNode(newNode);
      this.tryPushChildNode(d, newNode, reverseLink, linkData);
    });
  }

  linkColor(d, d_selected) {
    const sourceId = d.source.id || d.source;
    const targetId = d.target.id || d.target;
    if ([sourceId, targetId].includes(d_selected.id)) {
      return this.linkColors[this.getLinkTypeForLink(d)];
    } else {
      return this.linkColors.inactive;
    }
  }

  linkWidth(d, d_selected) {
    const sourceId = d.source.id || d.source;
    const targetId = d.target.id || d.target;
    return [sourceId, targetId].includes(d_selected.id) ? 2 : 1;
  }

  linkDasharray(d, d_selected) {
    if (d.probable) {
      return '6 2';
    }
  }

  nodeDefaultColor(d) {
    return d._root ? this.colors.root : this.colors.secondary;
  }

  nodeDefaultImage(d) {
    if (d._type === COMPANY) {
      return d._root ? this.icons.company.root : this.icons.company.inactive;
    } else if (d._type === PEP) {
      if (d.is_pep) {
        return this.icons.pep.inactive;
      }
      return this.icons.peoples.inactive;
    } else {
      throw new Error(`Not supported type - ${d._type}`);
    }
  }

  nodeRightClick(e, d) {
    e.preventDefault();
    if (d._root) return;

    const removeLinks = [];
    const removeNodes = [];

    // const removeChildNodesRecursive = (d_node) => {
    //   this.links.forEach((link) => {
    //     if (d_node === link.source) {
    //       if (link.target._linksCount < 2) {
    //         removeChildNodesRecursive(link.target);
    //         removeNodes.push(link.target);
    //       }
    //       removeLinks.push(link);
    //       d_node._linksCount -= 1;
    //       if (d_node._linksCount < 1) {
    //         removeNodes.push(d_node);
    //       }
    //     }
    //   });
    // }

    // removeChildNodesRecursive(d);

    this.links.forEach((link) => {
      if ([link.source, link.target].includes(d)) {
        if (d === link.source) {
          if (link.target._linksCount < 2 && !link.target._root) {
            removeNodes.push(link.target);
          }
        } else if (d === link.target) {
          if (link.source._linksCount < 2 && !link.target._root) {
            removeNodes.push(link.source);
          }
        }
        removeLinks.push(link);
        d._linksCount -= 1;
        if (d._linksCount < 1) {
          removeNodes.push(d);
        }
      }
    });

    this.links = this.links.filter((link) => !removeLinks.includes(link));
    this.nodes = this.nodes.filter((node) => !removeNodes.includes(node));

    this.select('.popover').remove();

    d._opened = false;
    this.scheme.svg.selectAll('.child-count')
      .attr('hidden', this.hideCount);

    this.update(d);
  }

  nodeHover(e, d) {
    if (!e.defaultPrevented) {
      d3.select(e.currentTarget).select('circle')
        .style('fill', this.colors.nodeHover);
    }
  }

  nodeBlur(e, d) {
    if (!e.defaultPrevented) {
      d3.select(e.currentTarget).select('circle')
        .style('fill', '#fff');
    }
  }

  increaseSimulationSpeed() {
    this.scheme.simulation.alpha(0.01);
    let a = 0.1;
    let int = setInterval(() => {
      if (a === 0.7) {
        clearInterval(int);
        return;
      }
      this.scheme.simulation.alpha(a);
      a += 0.1;
    }, 100);
  }

  dragStarted(e, d) {
    if (!e.active) this.scheme.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(e, d) {
    d.fx = e.x;
    d.fy = e.y;
  }

  dragEnded(e, d) {
    if (!e.active) this.scheme.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  flatten(root) {
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

  zoomed(e) {
    this.scheme.svg.attr('transform', e.transform);
  }

  update(d = { id: null }) {
    // const nodes = flatten(root);
    // const links = root.links();
    this.scheme.link = this.scheme.linksG
      .selectAll('.link')
      .data(this.links, (d) => d.id);

    this.scheme.link.exit().remove();

    const linkEnter = this.scheme.link
      .enter()
      .append('line')
      .attr("marker-end", (d_link) => this.markerEnd(d_link, d))
      .attr('class', 'link')
      .style('opacity', 0)
      .style('stroke', (d_link) => this.linkColor(d_link, d))
      .style('stroke-width', (d_link) => this.linkWidth(d_link, d))
      .style('stroke-dasharray', (d_link) => this.linkDasharray(d_link, d));
    // .on('mouseenter', lineHover)
    // .on('mouseleave', lineBlur);

    this.addTransition(linkEnter, 1000);

    this.scheme.link = linkEnter.merge(this.scheme.link);

    this.scheme.node = this.scheme.nodesG
      .selectAll('.node')
      .data(this.nodes, d => d.id);

    this.scheme.node.exit().remove();

    const nodeEnter = this.scheme.node
      .enter()
      .append('g')
      .attr('id', (d) => d.id)
      .attr('class', 'node')
      .style('opacity', 0)
      .style('stroke', (d) => this.nodeDefaultColor(d))
      .style('fill', (d) => this.nodeDefaultColor(d))
      .on('mouseenter', (e, d) => this.nodeHover(e, d))
      .on('mouseleave', (e, d) => this.nodeBlur(e, d))
      .on('click', (e, d) => this.nodeClick(e, d))
      .on('contextmenu', (e, d) => this.nodeRightClick(e, d))
      .call(d3.drag()
        .on('start', (e, d) => this.dragStarted(e, d))
        .on('drag', (e, d) => this.dragged(e, d))
        .on('end', (e, d) => this.dragEnded(e, d))
      );

    this.addTransition(nodeEnter);

    nodeEnter.append('circle')
      .attr("r", (d) => d._root ? 32 : 24)
      .style('cursor', 'pointer')
      .style('stroke-width', 2)
      .style('fill', '#fff');

    nodeEnter.append('rect')
      .attr('x', -7)
      .attr('y', -32)
      .attr('width', 14)
      .attr('height', 14)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('class', 'child-count')
      .style('stroke-width', 0)
      .style('cursor', 'pointer');

    let nodeIconGroup = nodeEnter.append('svg')
      .attr('x', (d) => d._root ? -22 : -16)
      .attr('y', (d) => d._root ? -24 : -18)
      .style('cursor', 'pointer')
      .append('g')
      .attr('transform', (d) => d._root ? 'scale(1.4)' : null);

    nodeIconGroup.append('g')
      .attr('class', 'node-image')
      .style('transform', 'translate(0px, 1px)')
      .html((d) => this.nodeDefaultImage(d));

    nodeIconGroup.append('g')
      .style('transform', 'translate(-1px, 18px)')
      .style('stroke-width', 0)
      .style('display', (d) => d.is_closed ? undefined : 'none')
      .html(closedCompanyIcon);

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

    this.scheme.node = nodeEnter.merge(this.scheme.node);
    this.scheme.simulation.nodes(this.nodes);
    this.scheme.simulation.force('link').links(this.links);

    this.nodes.forEach((d) => {
      let count = 0;
      this.links.forEach((link) => {
        if ([link.source.id, link.target.id].includes(d.id)) {
          count += 1;
        }
      });
      d._linksCount = count;
    });

    const engine = this;
    d3.selectAll('svg .node').each(function (d, i) {
      let content;
      if (d._type === PEP) {
        content = `<div class="company-name text-capitalize">${d.fullname}</div>` +
          `<div>${d.is_pep ? 'Є публічним діячем' : 'Не є публічним діячем'}</div>` +
          `<div><b>Тип:</b> ${d.pep_type || ' --- '}</div>` +
          `<div><b>Посада:</b> ${d.last_job_title || ' --- '}</div>`;

      } else if (d._type === COMPANY) {
        content = `<div class="company-name">${d.short_name || d.name}</div>` +
          `<div>${d.company_type || ' --- '}</div>` +
          `<div><b>ЄДРПОУ:</b> ${d.edrpou || ' --- '}</div>` +
          `<div><b>Статус:</b> ${d.status || ' --- '}</div>`;
      }
      engine.select(this).popover({
        trigger: 'hover',
        container: engine.select(S.schemeRoot),
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
    this.scheme.svg.selectAll('.child-count')
      .attr('hidden', (d) => this.hideCount(d));
  }

  handleOpenCompany(e) {
    e.preventDefault();
    this.select(e.currentTarget).closest('li').html(this.select(e.currentTarget).text());
    $.ajax(e.currentTarget.href, {
      headers: this.ajaxHeaders,
      success: (data) => {
        this.increaseSimulationSpeed();
        const newNodes = data.founder_of;
        delete data.founder_of;
        data._opened = true;
        data._type = COMPANY;
        data.id = this.getIdForNode(data);
        if (this.selectedNode.id !== data.id) {
          const isNew = this.pushIfNotExists(this.nodes, data);
          if (isNew) {
            data.x = this.selectedNode.x;
            data.y = this.selectedNode.y;
            // data._parent = selectedNode.id;
          }
        }
        // tryPushChildNode(selectedNode, data);
        this.addNewChildNodes(data, newNodes, COMPANY, (company) => {
          return [company, { _type: linkTypes.owner }];
        });
        this.update(data);
        waitElementAndClick(`#${data.id}`);
      },
      // error: () => {
      //   // endSearchLoading();
      //   // showMessage('Сталась непередбачувана помилка');
      // }
    });
  }
}

window.PepCompanyScheme = PepCompanyScheme;


// function lineHover(e, d) {
//   if (!e.defaultPrevented) {
//     d3.select(this)
//       .style('stroke-width', 2)
//       .style('stroke', colors.primary);
//   }
// }
//
// function lineBlur(e, d) {
//   if (!e.defaultPrevented) {
//     d3.select(this)
//       .style('stroke-width', 1)
//       .style('stroke', colors.secondary);
//   }
// }
