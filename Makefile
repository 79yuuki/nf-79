export NODE_PATH=test/testSupport:public/js:local_modules:system/helpers:game/backend/helpers:config:utils
REPORTER ?= dot

#	How to test modules:
#
#	Modules are tested by running 'npm test' in their folder.
#	E.g.:
#		cd ./local_modules/redis-client-extensions
#		npm test
#

#Non-module tests:
alltests := find . -name "*.js" | egrep -v '/node_modules/' | egrep '/test?/'


#Run all tests
test:
	@NODE_ENV=localTest ./node_modules/.bin/mocha $$($(alltests)) -r expect.js -R spec


#Watch for file changes, and run all tests when a file is updated
#testwatch:
#	@./node_modules/.bin/mocha $$($(alltests)) -r expect.js -R spec --timeout 8000 -w

#Watch for file changes, and run all tests when a file is updated (But stop on first failing test)
#testwatchbail:
#	@./node_modules/.bin/mocha $$($(alltests)) -r expect.js -R list --timeout 8000 -w -b

testnoroutes:
	@./node_modules/.bin/mocha $$($(alltestsbutroutes)) -r expect.js -R spec --timeout 8000

test-all: test-util test-routes

test-util:
	@./node_modules/.bin/mocha --reporter $(REPORTER) test/util_modules

test-routes:
	@./node_modules/.bin/mocha --reporter $(REPORTER) test/routes

#'coverage' and 'doc' are not in this list (since they build something)
.PHONY: test testgame testsystem testnoroutes testwatch testgamewatch testsystemwatch testwatchbail testgamewatchbail testsystemwatchbail jenkinstest gource
