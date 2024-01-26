prompt_symbol=㉿
interface_name="tun0"
interface=$(ip addr show dev $interface_name up | grep -o '^[0-9]*:[[:space:]][a-z0-9_]*:' |awk -F: '{print $2}' | sed s/\ //g)
ip=$(ip addr show dev $interface up | grep -o 'inet [0-9.]*' |awk '{print $2}')

PROMPT=$'%F{green}┌──[%B${interface}%b]-[%B${ip}%b]-[$(date "+%F")]-[$(date "+%T")]-(%B%F{green}%n'$prompt_symbol$'%m%b%F{green})--[%B%F{green}%(6~.%-1~/…/%4~.%5~)%b%F{green}]\n└─%B%F{blue}%%%f%b%F{cyan} '
