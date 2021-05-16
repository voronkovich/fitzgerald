.PHONY: dist
dist: dist/fitzgerald.min.js dist/fitzgerald.min.css

.PHONY: clean
clean:
	rm -rf dist/

.PHONY: release
release:
	npx release-it

dist/fitzgerald.min.js:
	npx esbuild \
		--bundle \
		--target=es2017 \
		--minify \
		--global-name=Fitz \
		--outfile=dist/fitzgerald.min.js \
		src/index.js

dist/fitzgerald.min.css:
	npx esbuild \
		--bundle \
		--minify \
		--outfile=dist/fitzgerald.min.css \
		src/style.css
