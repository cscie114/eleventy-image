const inspect = require("util").inspect;
const Image = require("@11ty/eleventy-img");


async function imageShortcode(url, alt, sizes) {
	try {
		let metadata = await Image(url, {
		widths: [1200, 1100, 1000, 900, 800, 700, 600, 500, 450, 400, 350, 300],
		formats: ["webp","jpeg"],
		urlPath: "/assets/images/",
		outputDir: "./dist/assets/images/",
		hashLength: 32,
		cacheOptions: {
		  // if a remote image URL, this is the amount of time before it fetches a fresh copy
		  duration: "7d",
		  // project-relative path to the cache directory
		  directory: ".cache",
		  removeUrlQueryParams: false, 
		}});
  
	let imageAttributes = {
	  alt,
	  sizes,
	  loading: "lazy",
	  decoding: "async",
	};
  
	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
} catch(err) {
	console.log(`error processing image ${url}`);
	console.log(`err`);
}
  }

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/**");
  eleventyConfig.addFilter(
    "inspect",
    (content) => `<pre>${inspect(content)}</pre>`
  );
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};


/*
  (async () => {
    let url = "https://images.unsplash.com/photo-1608178398319-48f814d0750c";
    let stats = await Image(url, {
      widths: [1200, 1024, 900, 600, 300],
	  formats: ["webp","jpeg"],
	  urlPath: "/assets/images/",
	  outputDir: "./src/assets/images/",
	  hashLength: 32,
	  cacheOptions: {
		// if a remote image URL, this is the amount of time before it fetches a fresh copy
		duration: "1d",
		// project-relative path to the cache directory
		directory: ".cache",
		removeUrlQueryParams: false, 
      }
	});
    console.log(stats);
  })();
  */