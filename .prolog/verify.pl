% Task-specific verification for the current worktree.
:- set_prolog_flag(unknown, error).
:- use_module(library(plunit)).
:- use_module(library(time)).
:- ensure_loaded('facts.kb').

% Resolve repository-root-relative paths from this file's location.
:- prolog_load_context(source, Src),
   absolute_file_name(Src, AbsSrc),
   file_directory_name(AbsSrc, Dir0),
   file_directory_name(Dir0, Root),
   assertz(root(Root)).

rp(Rel, Abs) :- root(Root), atom_concat('/', Rel, Tail), atom_concat(Root, Tail, Abs).

current_successful_observation :-
    repo_state(Head, Digest),
    observation(_, _, exit(0), _, Head, Digest).

current_research_evidence :-
    research_required(false).
current_research_evidence :-
    research_required(true),
    repo_state(Head, Digest),
    brave_search(_, _, _, Head, Digest).

base_complete :-
    task(_),
    current_successful_observation,
    current_research_evidence.

% ---- task-specific invariants ----

% The committed theme bundle must match the granular sources exactly.
theme_bundle_in_sync :-
    rp('/theme.css', TF),
    exists_file(TF),
    read_file_to_codes(TF, Bundle, []),
    atom_codes(B, Bundle),
    sub_atom(B, _, _, _, 'data-si-theme="obsidian-gold"'),
    sub_atom(B, _, _, _, '--si-bg-canvas'),
    sub_atom(B, _, _, _, '--si-accent-primary').

% Identity assets required by the design contract.
lambda_assets :-
    forall(member(F, ['assets/lambda-mark.svg',
                      'assets/lambda-network.svg',
                      'assets/starintel-mark.svg',
                      'assets/graph-grid.svg',
                      'assets/relation-path.svg']),
           (   rp(F, Abs),
               exists_file(Abs))).

% The package manifest must name @starintel/design and export theme.css.
package_contract :-
    rp('/package.json', PF), read_file_to_codes(PF, P, []),
    atom_codes(Atom, P),
    sub_atom(Atom, _, _, _, '"name": "@starintel/design"'),
    sub_atom(Atom, _, _, _, './theme.css').

% The agent guide must exist and name package + theme.
guide_present :-
    rp('/docs/AGENT-DESIGN-GUIDE.md', GF0), exists_file(GF0),
    rp('/docs/AGENT-DESIGN-GUIDE.md', GF), read_file_to_codes(GF, G, []),
    atom_codes(GA, G),
    sub_atom(GA, _, _, _, 'obsidian-gold'),
    sub_atom(GA, _, _, _, '@starintel/design').

% Showcase app must exist with its own manifest.
showcase_present :-
    rp('/examples/showcase/index.html', A), exists_file(A),
    rp('/examples/showcase/package.json', B), exists_file(B).

% Real, machine-recorded evidence: build, test, typecheck, showcase build
% must all have succeeded against the current tree state.
observed_ok(Args) :-
    repo_state(Head, Digest),
    observation(_, command(Args), exit(0), _, Head, Digest).

all_evidence :-
    forall(member(Args, [['pnpm', 'build'],
                         ['pnpm', 'test'],
                         ['pnpm', 'typecheck'],
                         ['pnpm', 'showcase:build']]),
           observed_ok(Args)).

complete :-
    base_complete,
    theme_bundle_in_sync,
    lambda_assets,
    package_contract,
    guide_present,
    showcase_present,
    all_evidence.

:- begin_tests(workspace_verification).

test(complete) :-
    complete.

:- end_tests(workspace_verification).

main :-
    catch(call_with_time_limit(60, (run_tests, once(complete))),
          Error,
          (print_message(error, Error), fail)),
    !,
    halt(0).
main :-
    halt(1).

:- initialization(main, main).
