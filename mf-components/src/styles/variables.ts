const size = {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
};

const media = {
    mobile: `(min-width: ${size.xs})`,
    largeMobile: `(min-width: ${size.md})`,
    tablet: `(min-width: ${size.md})`,
    desktop: `(min-width: ${size.lg})`,
    largeScreen: `(min-width: ${size.xl})`,
};

export default media;
