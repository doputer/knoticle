const encodeURL = (...paths: string[]) => {
  return paths.map((path) => encodeURIComponent(path)).join('/');
};

export default encodeURL;
