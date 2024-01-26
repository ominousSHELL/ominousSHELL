#VIM Mode in Terminal
export INSERT_MODE_INDICATOR="%F{cyan}+%f"
bindkey -M viins 'jj' vi-cmd-mode
bindkey -M viins 'jj' vi-cmd-mode
bindkey -M viins "^A" beginning-of-line
bindkey -M viins "^E" end-of-line
bindkey -M vicmd 'x' backward-delete-char
bindkey -M vicmd 'X' vi-delete-char
bindkey -v

bindkey '^[[Z' undo
bindkey '^[.' insert-last-word
bindkey '^U' backward-kill-line
bindkey '^[[1;5C' forward-word
bindkey '^[[1;5D' backward-word
bindkey '^R' history-incremental-search-backward
bindkey '^H' backward-kill-word
bindkey '^[[3;5~' kill-word
