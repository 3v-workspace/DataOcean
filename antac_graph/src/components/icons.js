// data-ocean
import do_company_active from '../icons/data-ocean/company/company_active.svg';
import do_company_inactive from '../icons/data-ocean/company/company_inactive.svg';
import do_company_root from '../icons/data-ocean/company/company_root.svg';
import do_pep_active from '../icons/data-ocean/pep/pep_active.svg';
import do_pep_inactive from '../icons/data-ocean/pep/pep_inactive.svg';
import do_peoples_active from '../icons/data-ocean/peoples/peoples_active.svg';
import do_peoples_inactive from '../icons/data-ocean/peoples/peoples_inactive.svg';
import do_search from '../icons/data-ocean/search.svg';
import do_slideUp from '../icons/data-ocean/slideUp.svg';
import do_dashedLine from '../icons/data-ocean/dashedLine.svg';

// antac
import aa_company_active from '../icons/antac/company/company_active.svg';
import aa_company_inactive from '../icons/antac/company/company_inactive.svg';
import aa_company_root from '../icons/antac/company/company_root.svg';
import aa_pep_active from '../icons/antac/pep/pep_active.svg';
import aa_pep_inactive from '../icons/antac/pep/pep_inactive.svg';
import aa_peoples_active from '../icons/antac/peoples/peoples_active.svg';
import aa_peoples_inactive from '../icons/antac/peoples/peoples_inactive.svg';
import aa_search from '../icons/antac/search.svg';
import aa_slideUp from '../icons/antac/slideUp.svg';
import aa_dashedLine from '../icons/antac/dashedLine.svg';


function getIconsForTheme(theme) {
  const icons = {
    company_active: do_company_active,
    company_inactive: do_company_inactive,
    company_root: do_company_root,
    pep_active: do_pep_active,
    pep_inactive: do_pep_inactive,
    peoples_active: do_peoples_active,
    peoples_inactive: do_peoples_inactive,
    search: do_search,
    slideUp: do_slideUp,
    dashedLine: do_dashedLine,
  };
  if (theme === 'data-ocean') {
    // pass
  } else if (theme === 'antac') {
    return {
      company_active: aa_company_active,
      company_inactive: aa_company_inactive,
      company_root: aa_company_root,
      pep_active: aa_pep_active,
      pep_inactive: aa_pep_inactive,
      peoples_active: aa_peoples_active,
      peoples_inactive: aa_peoples_inactive,
      search: aa_search,
      slideUp: aa_slideUp,
      dashedLine: aa_dashedLine,
    };
  } else {
    throw new Error(`Not supported theme - ${theme}`);
  }
  return icons;
}


export default function getDefaultIcons(icons, theme) {
  icons = icons || {};
  const themeIcons = getIconsForTheme(theme);
  return {
    company: {
      active: themeIcons.company_active,
      inactive: themeIcons.company_inactive,
      root: themeIcons.company_root,
      ...icons.company,
    },
    pep: {
      active: themeIcons.pep_active,
      inactive: themeIcons.pep_inactive,
      ...icons.pep,
    },
    peoples: {
      active: themeIcons.peoples_active,
      inactive: themeIcons.peoples_inactive,
      ...icons.peoples,
    },
    other: {
      search: themeIcons.search,
      slideUp: themeIcons.slideUp,
      dashedLine: themeIcons.dashedLine,
      ...icons.other,
    }
    // hearth: {
    //   active: 'static/icons/hearth/hearth_active.svg',
    //   inactive: 'static/icons/hearth/hearth_inactive.svg',
    //   ...(icons.hearth || {}),
    // },
    // briefcase: {
    //   active: 'static/icons/briefcase/briefcase_active.svg',
    //   inactive: 'static/icons/briefcase/briefcase_inactive.svg',
    //   ...(icons.briefcase || {}),
    // },
    // beneficiary: {
    //   active: 'static/icons/beneficiary/beneficiary_active.svg',
    //   inactive: 'static/icons/beneficiary/beneficiary_inactive.svg',
    //   ...(icons.beneficiary || {}),
    // },
    // top_manager: {
    //   active: 'static/icons/top_manager/top_manager_active.svg',
    //   inactive: 'static/icons/top_manager/top_manager_inactive.svg',
    //   ...(icons.top_manager || {}),
    // },
  };
}

