(ns advent2020.day1.part1
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))



(->> (io/resource "input_light.txt")
     slurp
     str/split-lines)
