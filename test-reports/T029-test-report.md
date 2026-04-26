# Test Report: T029

**Status**: ❌ FAILED
**Task**: Material list component
**Test File**: tests/materials.list.spec.ts
**Timestamp**: 2026-04-26T17:22:41.204Z

## Issues Found

**Output**:
```
{
  "config": {
    "configFile": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/playwright.config.ts",
    "rootDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests",
    "forbidOnly": false,
    "fullyParallel": true,
    "globalSetup": null,
    "globalTeardown": null,
    "globalTimeout": 0,
    "grep": {},
    "grepInvert": null,
    "maxFailures": 0,
    "metadata": {
      "actualWorkers": 6
    },
    "preserveOutput": "always",
    "projects": [
      {
        "outputDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results",
        "repeatEach": 1,
        "retries": 0,
        "metadata": {
          "actualWorkers": 6
        },
        "id": "chromium",
        "name": "chromium",
        "testDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      },
      {
        "outputDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results",
        "repeatEach": 1,
        "retries": 0,
        "metadata": {
          "actualWorkers": 6
        },
        "id": "firefox",
        "name": "firefox",
        "testDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      },
      {
        "outputDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results",
        "repeatEach": 1,
        "retries": 0,
        "metadata": {
          "actualWorkers": 6
        },
        "id": "webkit",
        "name": "webkit",
        "testDir": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests",
        "testIgnore": [],
        "testMatch": [
          "**/*.@(spec|test).?(c|m)[jt]s?(x)"
        ],
        "timeout": 30000
      }
    ],
    "quiet": false,
    "reporter": [
      [
        "json"
      ]
    ],
    "reportSlowTests": {
      "max": 5,
      "threshold": 300000
    },
    "shard": null,
    "tags": [],
    "updateSnapshots": "missing",
    "updateSourceMethod": "patch",
    "version": "1.59.1",
    "workers": 6,
    "webServer": {
      "command": "npm run dev",
      "url": "http://localhost:12001",
      "reuseExistingServer": true
    }
  },
  "suites": [
    {
      "title": "materials.list.spec.ts",
      "file": "materials.list.spec.ts",
      "column": 0,
      "line": 0,
      "specs": [],
      "suites": [
        {
          "title": "Materials List",
          "file": "materials.list.spec.ts",
          "line": 3,
          "column": 6,
          "specs": [
            {
              "title": "should display materials list",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 0,
                      "parallelIndex": 0,
                      "status": "timedOut",
                      "duration": 30023,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:36.993Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-display-materials-list-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-4edb114d9dbac55d1899",
              "file": "materials.list.spec.ts",
              "line": 13,
              "column": 3
            },
            {
              "title": "should have \"Novo Material\" button",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 1,
                      "parallelIndex": 1,
                      "status": "timedOut",
                      "duration": 30016,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:36.983Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fd7e7-d-have-Novo-Material-button-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-740c9c2854da30521583",
              "file": "materials.list.spec.ts",
              "line": 18,
              "column": 3
            },
            {
              "title": "should have search input",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 2,
                      "parallelIndex": 2,
                      "status": "timedOut",
                      "duration": 30021,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:37.014Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-have-search-input-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-6311c5edb0eae90cde4d",
              "file": "materials.list.spec.ts",
              "line": 22,
              "column": 3
            },
            {
              "title": "should navigate to create material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 3,
                      "parallelIndex": 3,
                      "status": "timedOut",
                      "duration": 30018,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:36.997Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-b8136-ate-to-create-material-page-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-0d3edbe31b7d297e68d3",
              "file": "materials.list.spec.ts",
              "line": 26,
              "column": 3
            },
            {
              "title": "should display pagination controls",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 4,
                      "parallelIndex": 4,
                      "status": "timedOut",
                      "duration": 30021,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:37.002Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-6193b-display-pagination-controls-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-eebeea12d5fc5bd45d3b",
              "file": "materials.list.spec.ts",
              "line": 32,
              "column": 3
            },
            {
              "title": "should search materials with debounce",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 5,
                      "parallelIndex": 5,
                      "status": "timedOut",
                      "duration": 30031,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:20:37.055Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-470ba-rch-materials-with-debounce-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-f70cedf2efd4eb40d9c3",
              "file": "materials.list.spec.ts",
              "line": 40,
              "column": 3
            },
            {
              "title": "should display material table with correct columns",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 6,
                      "parallelIndex": 1,
                      "status": "timedOut",
                      "duration": 30022,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:07.835Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-a8b16--table-with-correct-columns-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-def45caeb15b13b600d5",
              "file": "materials.list.spec.ts",
              "line": 52,
              "column": 3
            },
            {
              "title": "should have edit and delete buttons for each material",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 7,
                      "parallelIndex": 3,
                      "status": "timedOut",
                      "duration": 30021,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:07.827Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-61b3d-e-buttons-for-each-material-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-cfb52c94c17417d96d03",
              "file": "materials.list.spec.ts",
              "line": 67,
              "column": 3
            },
            {
              "title": "should open delete confirmation modal",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 8,
                      "parallelIndex": 0,
                      "status": "timedOut",
                      "duration": 30018,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:07.814Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fe3c9-n-delete-confirmation-modal-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-ff67bbaf9974f069aa7a",
              "file": "materials.list.spec.ts",
              "line": 81,
              "column": 3
            },
            {
              "title": "should navigate to edit material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "chromium",
                  "projectName": "chromium",
                  "results": [
                    {
                      "workerIndex": 9,
                      "parallelIndex": 4,
                      "status": "timedOut",
                      "duration": 30017,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:07.795Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-2701b-igate-to-edit-material-page-chromium/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-891738837ca65d1b6638",
              "file": "materials.list.spec.ts",
              "line": 98,
              "column": 3
            },
            {
              "title": "should display materials list",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 10,
                      "parallelIndex": 2,
                      "status": "timedOut",
                      "duration": 30027,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:07.889Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-display-materials-list-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-89611b7be917430e2d05",
              "file": "materials.list.spec.ts",
              "line": 13,
              "column": 3
            },
            {
              "title": "should have \"Novo Material\" button",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 11,
                      "parallelIndex": 5,
                      "status": "timedOut",
                      "duration": 30031,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:08.021Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fd7e7-d-have-Novo-Material-button-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-d73a68fc790f2d621652",
              "file": "materials.list.spec.ts",
              "line": 18,
              "column": 3
            },
            {
              "title": "should have search input",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 12,
                      "parallelIndex": 4,
                      "status": "timedOut",
                      "duration": 30021,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:38.510Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-have-search-input-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-c08ad85b5f3954c29bff",
              "file": "materials.list.spec.ts",
              "line": 22,
              "column": 3
            },
            {
              "title": "should navigate to create material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 13,
                      "parallelIndex": 0,
                      "status": "timedOut",
                      "duration": 30029,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:38.564Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-b8136-ate-to-create-material-page-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-e50419ba1d90a4893e8b",
              "file": "materials.list.spec.ts",
              "line": 26,
              "column": 3
            },
            {
              "title": "should display pagination controls",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 14,
                      "parallelIndex": 3,
                      "status": "timedOut",
                      "duration": 30027,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:38.573Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-6193b-display-pagination-controls-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-27bca7acf3d88b6b339c",
              "file": "materials.list.spec.ts",
              "line": 32,
              "column": 3
            },
            {
              "title": "should search materials with debounce",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 15,
                      "parallelIndex": 1,
                      "status": "timedOut",
                      "duration": 30024,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:38.621Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-470ba-rch-materials-with-debounce-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-8dca734d419c25d283a9",
              "file": "materials.list.spec.ts",
              "line": 40,
              "column": 3
            },
            {
              "title": "should display material table with correct columns",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 16,
                      "parallelIndex": 2,
                      "status": "timedOut",
                      "duration": 30025,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:39.759Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-a8b16--table-with-correct-columns-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-b510e4c265dc233b2958",
              "file": "materials.list.spec.ts",
              "line": 52,
              "column": 3
            },
            {
              "title": "should have edit and delete buttons for each material",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 17,
                      "parallelIndex": 5,
                      "status": "timedOut",
                      "duration": 30053,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:21:40.332Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-61b3d-e-buttons-for-each-material-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-cb926d886fc4931dbcab",
              "file": "materials.list.spec.ts",
              "line": 67,
              "column": 3
            },
            {
              "title": "should open delete confirmation modal",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 18,
                      "parallelIndex": 4,
                      "status": "timedOut",
                      "duration": 30021,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:09.872Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fe3c9-n-delete-confirmation-modal-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-09d76952a08f3d75b95f",
              "file": "materials.list.spec.ts",
              "line": 81,
              "column": 3
            },
            {
              "title": "should navigate to edit material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "firefox",
                  "projectName": "firefox",
                  "results": [
                    {
                      "workerIndex": 19,
                      "parallelIndex": 1,
                      "status": "timedOut",
                      "duration": 30025,
                      "error": {
                        "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m",
                        "stack": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8",
                        "location": {
                          "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                          "column": 8,
                          "line": 4
                        },
                        "snippet": "  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');"
                      },
                      "errors": [
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 8,
                            "line": 4
                          },
                          "message": "\u001b[31mTest timeout of 30000ms exceeded while running \"beforeEach\" hook.\u001b[39m\n\n  2 |\n  3 | test.describe('Materials List', () => {\n> 4 |   test.beforeEach(async ({ page }) => {\n    |        ^\n  5 |     // Login first\n  6 |     await page.goto('/login');\n  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:4:8"
                        },
                        {
                          "location": {
                            "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                            "column": 62,
                            "line": 7
                          },
                          "message": "Error: locator.fill: Test timeout of 30000ms exceeded.\nCall log:\n\u001b[2m  - waiting for locator('input[placeholder=\"seu@email.com\"]')\u001b[22m\n\n\n   5 |     // Login first\n   6 |     await page.goto('/login');\n>  7 |     await page.locator('input[placeholder=\"seu@email.com\"]').fill('admin@test.com');\n     |                                                              ^\n   8 |     await page.locator('input[placeholder=\"••••••••\"]').fill('Password123!');\n   9 |     await page.locator('button:has-text(\"Entrar\")').click();\n  10 |     await page.waitForURL('**/admin/materials');\n    at /home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts:7:62"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:10.262Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-2701b-igate-to-edit-material-page-firefox/error-context.md"
                        }
                      ],
                      "errorLocation": {
                        "file": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/tests/materials.list.spec.ts",
                        "column": 8,
                        "line": 4
                      }
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-0575f00df3a9a2887514",
              "file": "materials.list.spec.ts",
              "line": 98,
              "column": 3
            },
            {
              "title": "should display materials list",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 20,
                      "parallelIndex": 0,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:10.801Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-display-materials-list-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-7bc1d21be2db04ba8dec",
              "file": "materials.list.spec.ts",
              "line": 13,
              "column": 3
            },
            {
              "title": "should have \"Novo Material\" button",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 21,
                      "parallelIndex": 3,
                      "status": "failed",
                      "duration": 6,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:11.439Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fd7e7-d-have-Novo-Material-button-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-2663b6246de41b53c0fe",
              "file": "materials.list.spec.ts",
              "line": 18,
              "column": 3
            },
            {
              "title": "should have search input",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 22,
                      "parallelIndex": 0,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:11.847Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-List-should-have-search-input-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-44c4e76be6c3ba3b3b5f",
              "file": "materials.list.spec.ts",
              "line": 22,
              "column": 3
            },
            {
              "title": "should navigate to create material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 23,
                      "parallelIndex": 2,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:12.063Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-b8136-ate-to-create-material-page-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-a220f3d729c8ded39307",
              "file": "materials.list.spec.ts",
              "line": 26,
              "column": 3
            },
            {
              "title": "should display pagination controls",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 24,
                      "parallelIndex": 3,
                      "status": "failed",
                      "duration": 4,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:12.437Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-6193b-display-pagination-controls-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-8d5c1e6d628061e82573",
              "file": "materials.list.spec.ts",
              "line": 32,
              "column": 3
            },
            {
              "title": "should search materials with debounce",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 25,
                      "parallelIndex": 5,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:12.468Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-470ba-rch-materials-with-debounce-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-be74c2172046cb68c6a2",
              "file": "materials.list.spec.ts",
              "line": 40,
              "column": 3
            },
            {
              "title": "should display material table with correct columns",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 26,
                      "parallelIndex": 0,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:12.771Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-a8b16--table-with-correct-columns-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-92f77d070e6adb0181f2",
              "file": "materials.list.spec.ts",
              "line": 52,
              "column": 3
            },
            {
              "title": "should have edit and delete buttons for each material",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 27,
                      "parallelIndex": 2,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:12.947Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-61b3d-e-buttons-for-each-material-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-0e79678f6ab46e7946d8",
              "file": "materials.list.spec.ts",
              "line": 67,
              "column": 3
            },
            {
              "title": "should open delete confirmation modal",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 28,
                      "parallelIndex": 3,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:13.309Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-fe3c9-n-delete-confirmation-modal-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-cba7cad8bcc0ae7455c0",
              "file": "materials.list.spec.ts",
              "line": 81,
              "column": 3
            },
            {
              "title": "should navigate to edit material page",
              "ok": false,
              "tags": [],
              "tests": [
                {
                  "timeout": 30000,
                  "annotations": [],
                  "expectedStatus": "passed",
                  "projectId": "webkit",
                  "projectName": "webkit",
                  "results": [
                    {
                      "workerIndex": 29,
                      "parallelIndex": 5,
                      "status": "failed",
                      "duration": 3,
                      "error": {
                        "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝",
                        "stack": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                      },
                      "errors": [
                        {
                          "message": "Error: browserType.launch: \n╔══════════════════════════════════════════════════════╗\n║ Host system is missing dependencies to run browsers. ║\n║ Please install them with the following command:      ║\n║                                                      ║\n║     sudo npx playwright install-deps                 ║\n║                                                      ║\n║ Alternatively, use apt:                              ║\n║     sudo apt-get install libicu74\\                   ║\n║         libxml2\\                                     ║\n║         libevent-2.1-7t64\\                           ║\n║         libavif16\\                                   ║\n║         libmanette-0.2-0                             ║\n║                                                      ║\n║ <3 Playwright Team                                   ║\n╚══════════════════════════════════════════════════════╝"
                        }
                      ],
                      "stdout": [],
                      "stderr": [],
                      "retry": 0,
                      "startTime": "2026-04-26T17:22:13.307Z",
                      "annotations": [],
                      "attachments": [
                        {
                          "name": "error-context",
                          "contentType": "text/markdown",
                          "path": "/home/julio/Documentos/projetos/MARCENARIA_DO_GAUDERIO/frontend/test-results/materials.list-Materials-L-2701b-igate-to-edit-material-page-webkit/error-context.md"
                        }
                      ]
                    }
                  ],
                  "status": "unexpected"
                }
              ],
              "id": "d044f44d4ee9700c561d-156ee1691dddaecb3f42",
              "file": "materials.list.spec.ts",
              "line": 98,
              "column": 3
            }
          ]
        }
      ]
    }
  ],
  "errors": [],
  "stats": {
    "startTime": "2026-04-26T17:20:35.830Z",
    "duration": 125348.852,
    "expected": 0,
    "skipped": 0,
    "unexpected": 30,
    "flaky": 0
  }
}

```

**Errors**:

- Test execution failed

## Next Steps

1. Review the test output above
2. Check for:
   - Missing dependencies
   - API endpoint issues (ensure backend is running)
   - TypeScript compilation errors
   - Component import paths
3. Fix the issues and run tests again with:
   ```bash
   npm run test-task-completion -- T029
   ```

## Required Actions

If tests fail due to:
- **Backend not running**: Execute `npm run devStart` in another terminal
- **Database not ready**: Execute `sudo docker-compose up -d`
- **Admin user missing**: Execute `npx ts-node scripts/create_admin.ts`
