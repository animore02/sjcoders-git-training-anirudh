# Git & GitHub Training Notes

Name: Aniridh More
Training Date: 25 August 2026

## What is Git?

Git is a **distributed version control system (VCS)**. It tracks changes to 
files over time, so you can:
- See the full history of changes
- Revert to older versions if something breaks
- Work on different features in parallel using branches
- Collaborate with others without overwriting each other's work

Git runs **locally** on your machine — you don't need internet access to use it.

## What is GitHub?

GitHub is a **cloud-based hosting platform for Git repositories**. It adds a 
layer on top of Git for collaboration:
- Stores your repo online (remote backup)
- Lets teams collaborate via Pull Requests, Issues, code review
- Adds features like Actions (CI/CD), project boards, wikis
- Git is the tool, GitHub is a service that uses Git

**In short:** Git = version control tool. GitHub = platform to host/share Git repos.


## Git Commands Learned

1. git clone
2. git status
3. git add
4. git commit
5. git push
6. git pull
7. git branch
8. git switch


## Basic Important Git Commands

### 1. Setup
| `git init` | Start a new local repo |

| `git clone <url>` | Copy a remote repo to local |

### 2. Track Changes
| `git status` | Check what's changed |

| `git add <file>` | Stage a specific file |

| `git add .` | Stage all changes |

| `git commit -m "msg"` | Save staged changes with a message |

### 3. Sync with GitHub
| `git remote add origin <url>` | Connect local repo to GitHub |

| `git push` | Upload commits to GitHub |

| `git pull` | Download + merge latest changes |

### 4. History
| `git log` | View commit history |

| `git diff` | See exact changes made |

### 5. Branching
| `git branch` | List branches |

| `git checkout -b <name>` | Create + switch to new branch |

| `git checkout <name>` | Switch to existing branch |

| `git merge <branch>` | Merge a branch into current one |



## What I Learned Today

1. Git tracks changes in files.
2. GitHub hosts Git repositories online.
3. Commits save meaningful changes.
4. Branches allow developers to work independently.
5. Pull Requests allow changes to be reviewed before merging.

Commands used:
- `git init` - start a repo
- `git add .` - stage changes
- `git commit -m "message"` - save changes
- `git status` - check what's staged
- `git push` - send commits to GitHub
- `git branch` - see list of branches
