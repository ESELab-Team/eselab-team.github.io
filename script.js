/* 全站脚本：中英文切换 + 手机菜单 + 研究页按方向筛选。 */
(function () {
  'use strict';

  var STORAGE_KEY = 'eselab-language';
  var translations = {
    'ESELab | Emerging Structures and Energy Laboratory': 'ESELab | 新兴结构与能源实验室',
    'Research | ESELab': '研究 | ESELab',
    'People | ESELab': '团队 | ESELab',
    'Papers | ESELab': '论文 | ESELab',
    'Contact | ESELab': '联系我们 | ESELab',
    'ESELab is the Emerging Structures and Energy Laboratory led by Shiye Wang at the National University of Singapore, researching earthquake engineering, steel and composite structures, ocean energy, and AI for science.': 'ESELab（新兴结构与能源实验室）由汪士也负责，依托新加坡国立大学，研究方向包括地震工程、钢与组合结构、海洋能源及科学智能。',
    'Explore ESELab research in earthquake engineering, steel and composite structures, floating structures, ocean energy systems, numerical simulation, and AI for science.': '了解 ESELab 在地震工程、钢与组合结构、浮式结构、海洋能源系统、数值模拟及科学智能领域的研究。',
    'Meet ESELab group leader Shiye Wang and the laboratory members working on earthquake engineering, steel structures, ocean energy, and AI for science.': '认识 ESELab 实验室负责人汪士也及从事地震工程、钢结构、海洋能源和科学智能研究的团队成员。',
    'Selected journal papers and research publications from ESELab in structural engineering, earthquake resilience, marine structures, and ocean energy.': 'ESELab 在结构工程、抗震韧性、海洋结构和海洋能源领域的精选期刊论文与研究成果。',
    'Contact the Emerging Structures and Energy Laboratory (ESELab) at the National University of Singapore for research collaboration and academic enquiries.': '联系新加坡国立大学新兴结构与能源实验室（ESELab），开展科研合作与学术交流。',
    'News and updates from the Emerging Structures and Energy Laboratory.': '新兴结构与能源实验室的新闻与最新动态。',
    'Skip to content': '跳至主要内容',
    'Emerging Structures and Energy Laboratory': '新兴结构与能源实验室',
    'Menu': '菜单',
    'Home': '首页',
    'Research': '研究',
    'People': '团队',
    'Papers': '论文',
    'Contact': '联系我们',
    'Main': '主导航',
    'Footer': '页脚导航',
    'Coastal Protection and Flood Resilience Institute': '海岸防护与洪涝韧性研究所',
    'National University of Singapore': '新加坡国立大学',
    '© 2026 Emerging Structures and Energy Laboratory (ESELab)': '© 2026 新兴结构与能源实验室（ESELab）',

    'We develop emerging structures, advanced numerical simulation methods, and new devices for energy harvesting. Our work supports coastal protection, renewable energy, and the seismic safety of buildings.': '我们致力于新兴结构、先进数值模拟方法与新型能量采集装置的研发，为海岸防护、可再生能源利用和建筑抗震安全提供技术支撑。',
    'Research areas': '研究方向',
    'Floating structures': '浮式结构',
    'Wave attenuation, hydrodynamic response, and multihazard fragility of floating breakwaters and offshore platforms.': '研究浮式防波堤与海上平台的波浪衰减、水动力响应及多灾害易损性。',
    'Ocean energy': '海洋能源',
    'Tidal turbines and oscillating water columns integrated into floating platforms.': '研究集成于浮式平台的潮流能涡轮机与振荡水柱装置。',
    'Learning and control': '学习与控制',
    'Surrogate models, physics informed neural networks, and reinforcement learning control for marine and structural systems.': '面向海洋与结构系统的代理模型、物理信息神经网络和强化学习控制。',
    'Seismic steel structures': '钢结构抗震',
    'Cyclic local buckling, fiber modeling, and collapse simulation of steel and composite members.': '研究钢及组合构件的循环局部屈曲、纤维建模与倒塌模拟。',
    'Featured projects': '代表性项目',
    'All projects': '查看全部项目',
    'Floating breakwater with integrated wave and tidal energy': '集成波浪能与潮流能的浮式防波堤',
    'A 1:10 physical model of a floating breakwater carrying an oscillating water column and a tidal turbine.': '建立搭载振荡水柱和潮流能涡轮机的 1:10 浮式防波堤物理模型。',
    'Reinforcement learning control of tidal turbines': '潮流能涡轮机的强化学习控制',
    'A simulation environment for training and testing tidal turbine controllers under waves and currents.': '构建用于在波浪与水流共同作用下训练和测试潮流能涡轮机控制器的仿真环境。',
    'Cyclic local buckling of steel columns': '钢柱循环局部屈曲',
    'Fiber based simulation of inelastic local buckling in steel hollow section columns under earthquakes.': '采用纤维模型模拟钢空心截面柱在地震作用下的非弹性局部屈曲。',
    'Floating breakwater model with wave and tidal energy devices': '集成波浪能和潮流能装置的浮式防波堤模型',
    'Tidal turbine control simulation': '潮流能涡轮机控制仿真',
    'Local buckling of a steel column': '钢柱局部屈曲',
    'News': '新闻动态',
    'Lab news': '实验室动态',
    'Updates from our research, academic activities, and laboratory community.': '记录我们的研究进展、学术活动与实验室日常。',
    '16 Oct 2026': '2026年10月16日',
    '9 Oct 2026': '2026.10.9',
    'Sep 2026': '2026年9月',
    'Dec 2025': '2025年12月',
    'We host an international workshop on high performance and multifunctional floating breakwaters at NUS, with researchers from NUS, NTU, SIT, and Hong Kong Polytechnic University.': '我们将在新加坡国立大学举办高性能、多功能浮式防波堤国际研讨会，来自新加坡国立大学、南洋理工大学、新加坡理工学院和香港理工大学的学者将参加会议。',
    'International workshop on multifunctional floating breakwaters': '多功能浮式防波堤国际研讨会',
    'International workshop on high-performance and multi-functional floating breakwaters': '高性能与多功能浮式防波堤国际研讨会顺利举办',
    'The workshop brings together researchers working on coastal protection, floating infrastructure, and renewable energy integration.': '本次研讨会汇聚从事海岸防护、浮式基础设施与可再生能源集成研究的学者，共同交流最新进展。',
    'Special Issue on seismic resilience of steel and composite structures': '钢与组合结构抗震韧性特刊',
    'Shiye Wang serves as Guest Editor for a Special Issue of': '汪士也担任',
    '(MDPI) on seismic resilience of steel and composite structures.': '（MDPI）“钢与组合结构抗震韧性”特刊的客座编辑。',
    'The issue focuses on advanced analysis, experimental research, and resilient structural design under earthquake loading.': '该特刊聚焦地震作用下的先进分析方法、试验研究与韧性结构设计。',
    'Special session at ICASS 2025 in Hong Kong': 'ICASS 2025 香港专题分会',
    'Shiye Wang led a special session on high fidelity nonlinear simulation of steel structures in extreme limit states at ICASS 2025, Hong Kong.': '汪士也在香港举行的 ICASS 2025 会议上组织并主持“钢结构极限状态高保真非线性模拟”专题分会。',
    'The session created a focused forum for exchanging recent advances in nonlinear modeling and structural performance assessment.': '该专题分会为交流非线性建模与结构性能评估领域的最新进展提供了专业平台。',
    'Workshop image gallery': '研讨会图片',
    'Special Issue image gallery': '特刊相关图片',
    'ICASS session image gallery': 'ICASS 专题分会图片',
    'Previous image': '上一张图片',
    'Next image': '下一张图片',
    'Choose an image': '选择图片',
    'Lab news pagination': '实验室动态分页',
    'Previous page': '上一页',
    'Next page': '下一页',
    'View image 1': '查看第 1 张图片',
    'View image 2': '查看第 2 张图片',
    'View image 3': '查看第 3 张图片',
    'View image 4': '查看第 4 张图片',
    'View image 5': '查看第 5 张图片',
    'View image 6': '查看第 6 张图片',
    'View image 7': '查看第 7 张图片',
    'View image 8': '查看第 8 张图片',
    'View image 9': '查看第 9 张图片',
    'View image 10': '查看第 10 张图片',
    'View image 11': '查看第 11 张图片',
    'View image 12': '查看第 12 张图片',
    'View image 13': '查看第 13 张图片',
    'View image 14': '查看第 14 张图片',
    'Floating breakwater workshop photo gallery': '浮式防波堤研讨会照片',
    'Group photo of workshop speakers and participants': '研讨会报告人与参会者合影',
    'Participants attending the floating breakwater workshop': '参会者参加浮式防波堤研讨会',
    'Opening session of the floating breakwater workshop': '浮式防波堤研讨会开幕环节',
    'Presentation on marine antibiofouling systems': '海洋防生物污损系统专题报告',
    'Research presentation during the workshop': '研讨会科研报告现场',
    'Invited speaker presenting at the workshop': '特邀报告人在研讨会上作报告',
    'Presentation on offshore floating wave energy converters': '海上浮式波浪能转换装置专题报告',
    'Presentation on floating breakwater modelling and optimization': '浮式防波堤建模与优化专题报告',
    'Presentation on stepped floating breakwaters': '阶梯式浮式防波堤专题报告',
    'Presentation on additive manufacturing for marine structures': '海洋结构增材制造专题报告',
    'Presentation on structural systems for floating infrastructure': '浮式基础设施结构系统专题报告',
    'Presentation on hydrodynamic performance using porous media': '多孔介质水动力性能专题报告',
    'Workshop speakers discussing their research': '研讨会报告人开展学术交流',
    'Presentation on modular construction of floating breakwaters': '浮式防波堤模块化建造专题报告',
    'Numerical models of marine and structural systems': '海洋与结构系统数值模型',
    'Floating breakwater with integrated energy devices': '集成能源装置的浮式防波堤',
    'Offshore photovoltaic platform model': '海上光伏平台模型',
    'Additively manufactured steel column research': '增材制造钢柱研究',
    'Steel column local buckling simulation': '钢柱局部屈曲模拟',
    'Seismic performance testing of 3D-printed steel columns begins': '3D打印钢柱的抗震性能试验启动',
    '3D-printed steel column test gallery': '3D打印钢柱试验图片',
    'Test setup for the seismic performance experiment': '抗震性能试验加载装置',
    'Two 3D-printed rectangular steel column specimens': '两个3D打印矩形钢柱试件',
    'Close-up view of the 3D-printing process': '3D打印过程局部特写',
    'Visitor map': '访客地图',
    'VISITORS · LAND COVER': '访客 · 卫星地球',
    'Globe Visitors Counter': '全球访客统计',
    'Interactive satellite visitor globe': '交互式卫星访客地球',
    'Loading visitor globe…': '正在加载访客地球…',
    'Approximate visitor locations and visit counts.': '显示访客的大致地区和访问数量。',
    'Seismic performance testing of 3D-printed structural steel columns has officially begun! This research is being conducted in collaboration with Professor Zhiyang Xie, Dr. Ting Lou, and Dr. Jialiang Jin. We look forward to a smooth test program that will deepen our understanding of the seismic performance of 3D-printed steel structures. As AI develops rapidly, reliable experimental data uncontaminated by AI are becoming especially valuable. We hope this program will produce high-quality data, and we will do our best to make the experimental data openly available.': '3D 打印钢结构柱抗震性能试验正式启动！这次我们与谢智阳教授、楼挺博士、金家良博士合作开展研究，期待试验顺利进行，进一步拓展对 3D 打印钢结构抗震性能的认识。在 AI 快速发展的今天，真实可靠且没有被AI污染过的试验数据显得尤为珍贵。希望这次试验能获得高质量的数据，当然我们也会尽力去开源试验数据。',
    'On 16 October 2026, ESELab helped organize the International Workshop on High-Performance and Multi-functional Floating Breakwaters at the National University of Singapore. The workshop was co-organized by CORE and CFI at NUS together with RILS at The Hong Kong Polytechnic University, and was jointly organized and co-chaired by Professor Xudong Qian of NUS and Professor Xiaolin Zhao of HK PolyU. Researchers and practitioners shared recent advances in floating-breakwater hydrodynamics, wave and tidal energy integration, intelligent control, structural optimization, additive manufacturing, and modular construction. Shiye Wang presented research on deep reinforcement learning for tidal turbine pitch control under combined wave-current loading. We thank all speakers and participants for the insightful presentations and lively discussions, and look forward to further cross-institutional collaboration in coastal protection, offshore renewable energy, and intelligent marine engineering.': '2026年10月16日，ESELab 在新加坡国立大学参与组织了“高性能与多功能浮式防波堤”国际研讨会。本次研讨会由新加坡国立大学海洋研究与工程中心（CORE）、海岸防护与洪涝韧性研究所（CFI）以及香港理工大学土地及空间研究院（RILS）联合主办，并由新加坡国立大学钱旭东教授和香港理工大学赵晓林教授共同组织并担任大会主席。来自高校和业界的研究人员围绕浮式防波堤水动力、波浪能与潮流能集成、智能控制、结构优化、增材制造和模块化建造等主题分享了最新进展。汪士也博士报告了波流联合作用下潮流能涡轮机变桨控制的深度强化学习研究。感谢各位报告人和参会者带来的精彩分享与热烈讨论，期待进一步推动海岸防护、海洋可再生能源与智能海洋工程领域的跨机构合作。',
    'Join the lab': '加入我们',
    'We welcome PhD students, postdocs, and visiting researchers interested in marine structures, ocean energy, and structural engineering.': '欢迎对海洋结构、海洋能源和结构工程感兴趣的博士研究生、博士后及访问学者加入我们。',
    'How to apply': '申请方式',

    'Our projects combine physical model tests, numerical simulation, and machine learning. Choose an area to filter the list.': '我们的项目结合物理模型试验、数值模拟与机器学习。请选择研究方向以筛选项目。',
    'Filter by research area': '按研究方向筛选',
    'All areas': '全部方向',
    'We designed a 1:10 physical model of a floating breakwater that carries an oscillating water column and a horizontal axis tidal turbine. We are also developing a machine learning surrogate to identify suitable sites in Singapore waters.': '我们设计了一套 1:10 浮式防波堤物理模型，集成振荡水柱和水平轴潮流能涡轮机；同时开发机器学习代理模型，用于识别新加坡水域的适宜部署位置。',
    'We built a simulation environment for training and testing tidal turbine controllers. Agents learn pitch control under combined wave and current loading.': '我们构建了用于训练和测试潮流能涡轮机控制器的仿真环境，使智能体学习波浪与水流共同作用下的桨距控制。',
    'We simulate inelastic cyclic local buckling in steel hollow section columns under earthquake loading with a fiber based approach.': '我们采用纤维模型方法模拟钢空心截面柱在地震作用下的非弹性循环局部屈曲。',
    'Multihazard fragility of offshore photovoltaic platforms': '海上光伏平台的多灾害易损性',
    'We assess the multihazard fragility of offshore photovoltaic platforms with OpenSees models.': '我们利用 OpenSees 模型评估海上光伏平台的多灾害易损性。',
    'Compact material models for concrete filled steel tubes': '钢管混凝土紧凑型材料模型',
    'We distil a trained Gaussian process surrogate into closed form expressions that give material model parameters for concrete filled steel tube columns.': '我们将训练后的高斯过程代理模型提炼为闭式表达式，用于确定钢管混凝土柱的材料模型参数。',
    'Seismic behavior of additively manufactured steel columns': '增材制造钢柱的抗震性能',
    'A test program on the cyclic behavior of steel columns produced by wire arc additive manufacturing.': '开展电弧增材制造钢柱循环性能试验研究。',
    'Offshore photovoltaic platform': '海上光伏平台',
    'Concrete filled steel tube column model': '钢管混凝土柱模型',
    'Wire arc additively manufactured steel column': '电弧增材制造钢柱',

    'The people behind our research.': '认识推动我们研究工作的团队成员。',
    'Group Leader': '实验室负责人',
    'Shiye Wang': '汪士也',
    'Name': '姓名',
    'Position': '职位',
    'Research Area': '研究领域',
    'Research Fellow': '研究员',
    'Earthquake Engineering': '地震工程',
    'Steel & Composite Structures': '钢与组合结构',
    'Ocean Energy': '海洋能源',
    'Master\'s Students (Co-supervised)': '硕士研究生（共同指导）',
    'Ruixin Lü': '吕瑞昕',
    'Seismic performance of steel structural joints': '钢结构节点抗震性能',
    'Year': '年级',
    'Class of 2024': '2024级',
    'Portrait of Ruixin Lü': '吕瑞昕照片',
    'Portrait of Shiye Wang': '汪士也照片',
    'Research Fellow, National University of Singapore': '新加坡国立大学研究员',
    'Shiye Wang is a Research Fellow at the Coastal Protection and Flood Resilience Institute, National University of Singapore. Shiye received a PhD in Structural Engineering from Tongji University in 2024, including a year of joint training at EPFL.': '汪士也现任新加坡国立大学海岸防护与洪涝韧性研究所研究员，于 2024 年获同济大学结构工程博士学位，期间曾在洛桑联邦理工学院（EPFL）进行一年联合培养。',
    'Current research covers floating structures for coastal protection, tidal energy, reinforcement learning control, and the seismic behavior of steel and composite structures.': '目前的研究涵盖海岸防护浮式结构、潮流能、强化学习控制，以及钢与组合结构的抗震性能。',
    'Email': '邮箱',
    'CV': '个人简历',
    'Members': '团队成员',
    'We are building the team and welcome PhD students, postdocs, and visiting researchers.': '团队正在建设中，欢迎博士研究生、博士后和访问学者加入。',

    'Selected journal papers. See': '精选期刊论文。完整列表请见',
    'for the full list.': '。',
    'Title of your paper': '论文标题',
    'Journal Name': '期刊名称',

    'Get in touch about collaboration, visits, or open positions.': '欢迎就科研合作、访问交流或职位申请与我们联系。',
    'Address': '地址',
    'Street address': '街道地址',
    'Singapore postal code': '新加坡邮政编码',
    'PhD students': '博士研究生',
    'We welcome applicants with a background in civil, ocean, or mechanical engineering. Send your CV, transcripts, and a short statement of your research interests.': '欢迎具有土木、海洋或机械工程背景的申请者。请发送个人简历、成绩单及简短的研究兴趣陈述。',
    'Postdoctoral researchers': '博士后研究人员',
    'Send your CV, two representative papers, and the names of two referees.': '请发送个人简历、两篇代表性论文以及两位推荐人的姓名。',
    'Visiting researchers and interns': '访问学者与实习生',
    'Send your CV with the dates and topic of your proposed visit.': '请发送个人简历，并说明计划访问的时间与研究主题。'
  };

  var translatedAttributes = ['alt', 'aria-label', 'title', 'content'];
  var currentLanguage = readSavedLanguage();

  function readSavedLanguage() {
    try {
      var requested = new URLSearchParams(window.location.search).get('lang');
      if (requested === 'en' || requested === 'zh') return requested;
    } catch (error) {
      /* 旧浏览器不支持 URLSearchParams 时继续读取已保存的选择。 */
    }
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'zh';
    } catch (error) {
      return 'zh';
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      /* 某些隐私模式不允许本地存储；本页切换仍然可用。 */
    }
  }

  function translateTextNodes(language) {
    var walker = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentElement;
          if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|SVG)$/i.test(parent.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );
    var node;
    while ((node = walker.nextNode())) {
      if (typeof node.__eselabEnglishText === 'undefined') {
        node.__eselabEnglishText = node.nodeValue.trim();
      }
      var english = node.__eselabEnglishText;
      var value = language === 'zh' && translations[english] ? translations[english] : english;
      var leading = node.nodeValue.match(/^\s*/)[0];
      var trailing = node.nodeValue.match(/\s*$/)[0];
      node.nodeValue = leading + value + trailing;
    }
  }

  function translateAttributes(language) {
    document.querySelectorAll('[alt], [aria-label], [title], meta[name="description"]').forEach(function (element) {
      if (!element.__eselabEnglishAttributes) element.__eselabEnglishAttributes = {};
      translatedAttributes.forEach(function (attribute) {
        if (!element.hasAttribute(attribute)) return;
        if (typeof element.__eselabEnglishAttributes[attribute] === 'undefined') {
          element.__eselabEnglishAttributes[attribute] = element.getAttribute(attribute);
        }
        var english = element.__eselabEnglishAttributes[attribute];
        element.setAttribute(attribute, language === 'zh' && translations[english] ? translations[english] : english);
      });
    });
  }

  function updateLanguageSwitch(language) {
    document.querySelectorAll('.lang-switch button[data-lang]').forEach(function (button) {
      var active = button.getAttribute('data-lang') === language;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.setAttribute('tabindex', active ? '-1' : '0');
    });
    var group = document.querySelector('.lang-switch');
    if (group) {
      group.setAttribute('aria-label', language === 'zh' ? '语言选择' : 'Language selection');
    }
  }

  function applyLanguage(language, updateUrl) {
    currentLanguage = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
    translateTextNodes(currentLanguage);
    translateAttributes(currentLanguage);
    updateLanguageSwitch(currentLanguage);
    saveLanguage(currentLanguage);

    if (updateUrl) {
      try {
        var url = new URL(window.location.href);
        if (currentLanguage === 'en') url.searchParams.set('lang', 'en');
        else url.searchParams.delete('lang');
        history.replaceState(null, '', url);
      } catch (error) {
        /* 本地文件模式下无法更新地址时，不影响页面切换。 */
      }
    }

    var activeFilter = document.querySelector('.filters button[aria-pressed="true"]');
    if (activeFilter && typeof window.eselabApplyFilter === 'function') {
      window.eselabApplyFilter(activeFilter.getAttribute('data-filter'));
    }
    if (typeof window.eselabRenderNewsPagination === 'function') {
      window.eselabRenderNewsPagination();
    }
  }

  function createLanguageSwitch() {
    var headerWrap = document.querySelector('.site-header .wrap');
    if (!headerWrap || headerWrap.querySelector('.lang-switch')) return;

    var group = document.createElement('div');
    group.className = 'lang-switch';
    group.setAttribute('role', 'group');
    group.innerHTML = '<button type="button" data-lang="zh">中文</button><button type="button" data-lang="en">EN</button>';
    group.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-lang]');
      if (button) applyLanguage(button.getAttribute('data-lang'), true);
    });
    headerWrap.appendChild(group);
  }

  createLanguageSwitch();
  applyLanguage(currentLanguage, false);

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('[data-carousel-track]');
      var slides = carousel.querySelectorAll('.news-slide');
      var previous = carousel.querySelector('[data-carousel-prev]');
      var next = carousel.querySelector('[data-carousel-next]');
      var dots = carousel.querySelectorAll('[data-carousel-dot]');
      var activeIndex = 0;
      var scrollTimer;

      if (!track || !slides.length) return;

      function updateDots() {
        dots.forEach(function (dot, index) {
          if (index === activeIndex) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      }

      function showSlide(index, behavior) {
        activeIndex = (index + slides.length) % slides.length;
        track.scrollTo({
          left: activeIndex * track.clientWidth,
          behavior: behavior || 'smooth'
        });
        updateDots();
      }

      if (previous) {
        previous.addEventListener('click', function () {
          showSlide(activeIndex - 1);
        });
      }
      if (next) {
        next.addEventListener('click', function () {
          showSlide(activeIndex + 1);
        });
      }
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          showSlide(Number(dot.getAttribute('data-carousel-dot')));
        });
      });
      track.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          activeIndex = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
          updateDots();
        }, 80);
      });
      track.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showSlide(activeIndex - 1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showSlide(activeIndex + 1);
        }
      });
      window.addEventListener('resize', function () {
        track.scrollLeft = activeIndex * track.clientWidth;
      });
    });
  }

  function initNewsPagination() {
    var section = document.getElementById('lab-news');
    var pagination = document.querySelector('[data-news-pagination]');
    if (!section || !pagination) return;

    var items = Array.prototype.slice.call(section.querySelectorAll('.lab-news-item'));
    var previous = pagination.querySelector('[data-news-prev]');
    var next = pagination.querySelector('[data-news-next]');
    var status = pagination.querySelector('[data-news-page-status]');
    var pageSize = 3;
    var pageCount = Math.max(1, Math.ceil(items.length / pageSize));
    var currentPage = 1;

    try {
      var requestedPage = Number(new URLSearchParams(window.location.search).get('news-page'));
      if (Number.isInteger(requestedPage) && requestedPage > 0) currentPage = requestedPage;
    } catch (error) {
      /* 不支持 URLSearchParams 时仍可正常使用页面按钮。 */
    }
    currentPage = Math.min(currentPage, pageCount);

    function render(updateUrl, shouldScroll) {
      var start = (currentPage - 1) * pageSize;
      var end = start + pageSize;

      items.forEach(function (item, index) {
        item.hidden = index < start || index >= end;
        item.classList.remove('news-page-first');
      });
      if (items[start]) items[start].classList.add('news-page-first');

      pagination.hidden = pageCount <= 1;
      if (status) {
        status.textContent = currentLanguage === 'zh'
          ? '第 ' + currentPage + ' / ' + pageCount + ' 页'
          : 'Page ' + currentPage + ' of ' + pageCount;
      }
      if (previous) previous.disabled = currentPage === 1;
      if (next) next.disabled = currentPage === pageCount;

      if (updateUrl) {
        try {
          var url = new URL(window.location.href);
          if (currentPage === 1) url.searchParams.delete('news-page');
          else url.searchParams.set('news-page', String(currentPage));
          history.replaceState(null, '', url);
        } catch (error) {
          /* 本地文件模式下无法更新地址时，不影响分页。 */
        }
      }

      if (shouldScroll) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (previous) {
      previous.addEventListener('click', function () {
        if (currentPage === 1) return;
        currentPage -= 1;
        render(true, true);
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        if (currentPage === pageCount) return;
        currentPage += 1;
        render(true, true);
      });
    }

    window.eselabRenderNewsPagination = function () {
      render(false, false);
    };
    render(false, false);
  }

  initCarousels();
  initNewsPagination();

  var bar = document.querySelector('.filters');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button[data-filter]');
  var rows = document.querySelectorAll('[data-tags]');
  var count = document.querySelector('.count');

  function applyFilter(filter) {
    var shown = 0;
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
    rows.forEach(function (row) {
      var tags = row.getAttribute('data-tags').split(/\s+/);
      var visible = filter === 'all' || tags.indexOf(filter) !== -1;
      row.hidden = !visible;
      if (visible) shown++;
    });
    if (count) {
      count.textContent = currentLanguage === 'zh'
        ? '显示 ' + shown + ' 个项目'
        : 'Showing ' + shown + (shown === 1 ? ' project' : ' projects');
    }
  }

  window.eselabApplyFilter = applyFilter;

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter');
      applyFilter(filter);
      try {
        var url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('area');
        else url.searchParams.set('area', filter);
        history.replaceState(null, '', url);
      } catch (error) {
        /* 本地双击打开时浏览器可能不允许改地址，忽略即可。 */
      }
    });
  });

  var start = new URLSearchParams(window.location.search).get('area') || 'all';
  if (!bar.querySelector('[data-filter="' + start + '"]')) start = 'all';
  applyFilter(start);
})();
