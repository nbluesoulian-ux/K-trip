<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Second Brain (Obsidian) 사용 규칙

## Obsidian Vault 정보
- **Obsidian Vault 경로:** `C:\Users\blues\OneDrive\Desktop\web_Projects`
- **현재 프로젝트 문서 폴더:** `C:\Users\blues\OneDrive\Desktop\web_Projects\01_Projects\01_Active\스프린트미션5`
  *(참고: Windows/Obsidian 환경에 따라 파일명이 `*.md` 또는 `*.md.md` 형태로 존재할 수 있으므로 두 형태 모두 확인)*

## [작업 전]
- Vault의 `AGENTS.md` (또는 `AGENTS.md.md`)를 읽고 지식 저장소 사용 규칙을 확인한다.
- 현재 프로젝트의 `PROJECT.md`, `STATUS.md`, `TODO.md`, `DECISIONS.md` 중 작업에 필요한 문서를 읽는다.
- UI 작업이면 `DESIGN.md`를 반드시 읽는다.
- 공용 지식은 이번 작업과 관련된 것만 찾아 읽는다.
- Vault 전체를 매번 읽지는 않는다.

## [작업 완료 후 자동 기록]
- 실제 진행 상황이 바뀌면 `STATUS.md`를 갱신한다.
- 할 일이 추가되거나 완료되면 `TODO.md`를 갱신한다.
- 확정된 중요한 결정과 이유는 프로젝트 `DECISIONS.md`에 기록한다.
- 여러 프로젝트에서 재사용할 지식은 `03_Knowledge`에 정리한다.
- 재사용 가치가 확인된 프롬프트는 `06_Prompts`에 저장한다.
- 조사 내용은 프로젝트 전용이면 프로젝트 `RESEARCH.md`에, 공용이면 `04_Research`에 출처와 함께 기록한다.
- 저장할 가치는 있지만 분류가 불확실한 내용은 `00_Inbox`에 둔다.
- 실제 하위 폴더 이름을 확인해서 사용하고 임의로 추측하지 않는다.

## [기록 원칙]
- 기록할 변화가 없다면 파일을 수정하지 않는다.
- 모든 폴더를 억지로 채우거나 같은 내용을 중복 저장하지 않는다.
- 제안, 확정 결정, 검증된 결과를 구분한다.
- 테스트하지 않은 것을 테스트 완료했다고 기록하지 않는다.
- 기존 디자인 규칙 변경이나 파일 삭제는 별도 승인을 받는다.
- 비밀번호, API 키, 불필요한 개인정보는 기록하지 않는다.
- `.obsidian` 설정 폴더는 수정하지 않는다.

## [보고 원칙]
- 작업 결과를 사용자에게 보고할 때는 갱신한 Obsidian 문서의 변경 요약도 짧게 함께 안내한다.

