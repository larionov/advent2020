package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	data, err := ioutil.ReadFile("./input.txt")
	check(err)

	lines := strings.Split(strings.TrimSpace(string(data)), "\n")

	for i := 0; i < len(lines); i++ {
		for j := i; j < len(lines); j++ {
			for k := j; k < len(lines); k++ {

				iv, err := strconv.Atoi(lines[i])
				jv, err := strconv.Atoi(lines[j])
				kv, err := strconv.Atoi(lines[k])
				check(err)

				if iv+jv+kv == 2020 {
					fmt.Print(iv*jv*kv, "\n")

				}
			}
		}
	}
}
