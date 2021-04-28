.PHONY: dist
dist: dist/modest-popup.min.js dist/modest-popup.min.css

.PHONY: lint
lint:
	npx eslint src/

.PHONY: lint-fix
lint-fix:
	npx eslint --fix src/ tests/

.PHONY: test
test:
	npx jest

.PHONY: clean
clean:
	rm -rf dist/

dist/modest-popup.min.js:
	npx esbuild \
		--bundle \
		--target=es2017 \
		--minify \
		--global-name=ModestPopup \
		--outfile=dist/modest-popup.min.js \
		src/index.js

dist/modest-popup.min.css:
	npx esbuild \
		--bundle \
		--minify \
		--outfile=dist/modest-popup.min.css \
		src/style.css
